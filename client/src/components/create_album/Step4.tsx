import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import addCover from "../../assets/addImage.svg";
import addAudio from "../../assets/addAudio.svg";
import addTrack from "../../assets/iconPlus.svg";
import playTrack from "../../assets/playOrangeColor.svg";
import pauseTrack from "../../assets/pauseOrangeColor.svg";
import editTrack from "../../assets/edit-icon.svg";
import deleteTrack from "../../assets/delete-icon.svg";
import type { TrackCreationFullDto } from "../../models/DTO/track/TrackCreationFullDto.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import type { GenreSimpleDto } from "../../models/DTO/GenreSimpleDto.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTopGenres } from "../../store/reducers/action-creators/genre";
import MySelect from "../ui/MySelect";
import {fetchTopAuthorsByMonth} from "../../store/reducers/action-creators/author.ts";
import type {AuthorSimpleDto} from "../../models/DTO/AuthorSimpleDto.ts";

interface TrackItemProps {
  track: TrackCreationFullDto;
  index: number;
  editClick: (index: number) => void;
  deleteClick: (index: number) => void;
}

const TrackItem = ({ track, index, deleteClick, editClick }: TrackItemProps) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    if (track.clientCoverName) {
      const objectUrl = URL.createObjectURL(track.clientCoverName);
      setCoverUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setCoverUrl(null);
    }
  }, [track.clientCoverName]);

  useEffect(() => {
    if (track.clientFileName) {
      const objectUrl = URL.createObjectURL(track.clientFileName);
      setAudioUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setAudioUrl(null);
    }
  }, [track.clientFileName]);

  // Сбрасываем состояние play, когда трек закончился
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setPlay(false);

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const playClick = () => {
    if (!audioRef.current) return;

    if (play) {
      audioRef.current.pause();
      setPlay(false);
    } else {
      audioRef.current.play();
      setPlay(true);
    }
  };

  return (
    <Box
      position="relative"
      height="80px"
      margin="0 auto"
      display="flex"
      flexDirection="row"
      gap={2}
      px="12px"
      borderRadius="10px"
      border="1px solid #FF990066"
      boxSizing={"border-box"}
      alignItems="center"
      sx={{
        background: "var(--gradient-purple-rose)",
      }}
    >
      {/* Заголовок */}
      <Box
        position="absolute"
        top={-12}
        left="50%"
        sx={{
          transform: "translateX(-50%)",
          background: "var(--columbia-blue)",
          borderRadius: "50px",
          px: "12px",
          py: "6px",
        }}
      >
        <Typography fontSize="14px" fontWeight={700}>
          Трек {index + 1}
        </Typography>
      </Box>

      {/* Обложка */}
      <Box
        width="60px"
        height="60px"
        borderRadius="8px"
        flexShrink={0}
        sx={{
          backgroundImage: `url(${coverUrl || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#6B7280",
        }}
      />

      {/* Инфо */}
      <Box flex={1} minWidth={0}>
        <Typography
          variant="h4"
          color="var(--columbia-blue)"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {track.title}
        </Typography>

        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
          <Typography
            variant="mainRL"
            color="white"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              minWidth: 0,
            }}
          >
            {track.authors.map((artist) => artist.name).join(", ")}
          </Typography>

          <Typography
            variant="mainRL"
            color="white"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              minWidth: 0,
            }}
          >
            {track.genres.map((genre) => genre.name).join(", ")}
          </Typography>
        </Box>
      </Box>

      {/* Кнопки */}
      <IconButton onClick={playClick} sx={{ padding: 0, flexShrink: 0 }}>
        {!play ? (
          <Box
            component="img"
            src={playTrack}
            alt="playTrack"
            height="28px"
            width="28px"
          />
        ) : (
          <Box
            component="img"
            src={pauseTrack}
            alt="pauseTrack"
            height="28px"
            width="28px"
          />
        )}
      </IconButton>
      <IconButton sx={{ padding: 0, flexShrink: 0 }} onClick={() => editClick(index)}>
        <Box
          component="img"
          src={editTrack}
          alt="editTrack"
          height="28px"
          width="28px"
        />
      </IconButton>
      <IconButton sx={{ padding: 0, flexShrink: 0 }} onClick={() => deleteClick(index)}>
        <Box
          component="img"
          src={deleteTrack}
          alt="deleteTrack"
          height="28px"
          width="28px"
        />
      </IconButton>

      {/* Аудио (невидимый плеер) */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="auto" style={{ display: "none" }} />
      )}
    </Box>
  );
};


interface Step4Props {
  tracks: TrackCreationFullDto[];
  setTracks: (tracks: TrackCreationFullDto[]) => void;
}

const Step4 = ({ tracks, setTracks }: Step4Props) => {
  const [titleTrack, setTitleTrack] = useState<string>("");
  const [authorsTrack, setAuthorsTrack] = useState<AuthorSimpleDto[]>([]);
  const [genresTrack, setGenresTrack] = useState<GenreSimpleDto[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  // const [searchAuthor, setSearchAuthor] = useState('');
  // const [searchGenre, setSearchGenre] = useState('');

  const authors = useAppSelector((state) => state.author.topAuthors);
  const genres = useAppSelector((state) => state.genre.topFiveGenres);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopAuthorsByMonth({}));
    dispatch(fetchTopGenres({size: 50000}));
  }, [dispatch]);

  const authorOptions = useMemo(() => {
      return authors.map((author) => ({
          label: author.name,
          value: author.id.toString(),
      }));
  }, [authors]);

  const handleImageClick = () => {
    if (!imageFile) {
      imageInputRef.current?.click();
    }
  };

  const handleAudioClick = () => {
    if (!audioFile) {
      audioInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeAudio = () => {
    setAudioFile(null);
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const createTrack = () => {
    const newTrack: TrackCreationFullDto = {
      title: titleTrack,
      authors: authorsTrack,
      genres: genresTrack,
      clientFileName: audioFile,
      clientCoverName: imageFile,
    };
    console.log(newTrack)
    setTracks([...tracks, newTrack]);

    setTitleTrack("")
    setAuthorsTrack([])
    setGenresTrack([])
    removeAudio()
    removeImage()
  };

  const deleteTrack = (index: number) => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  const editTrack = (index: number) => {
    const trackToEdit = tracks[index];
    
    if (trackToEdit) {
      setTitleTrack(trackToEdit.title);
      setAuthorsTrack(trackToEdit.authors);
      setGenresTrack(trackToEdit.genres);
      setAudioFile(trackToEdit.clientFileName);
      setImageFile(trackToEdit.clientCoverName);
    }
  };

    return (
    <Box>
      {tracks.map((track, index) => (
        <TrackItem key={index} track={track} index={index} deleteClick={deleteTrack} editClick={editTrack} />
      ))}
      <Typography
        variant="h3"
        color="var(--orange-peel)"
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        Додайте трек, назву, співвиконавців і жанр
      </Typography>

      <Box
        mt={3}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={"10px"}
      >
        <Box
          width={"95%"}
          margin={"0 auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Typography variant="h4" color="var(--columbia-blue)">
            Назва треку
          </Typography>
          <OutlinedInput
            placeholder={"Введіть назву треку"}
            value={titleTrack}
            onChange={(e) => setTitleTrack(e.target.value)}
            type="text"
            sx={{
              width: "589px",
              height: "44px",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              color: "#6B7280",
              fontFamily: "Work Sans, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              "& .MuiInputBase-input::placeholder": {
                color: "#6B7280",
                opacity: 1,
              },
              "& .MuiOutlinedInput-input": {
                padding: "0px 12px", // внутренние отступы для текста
              },
            }}
          />
        </Box>
        <Box
          width={"95%"}
          margin={"0 auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Typography variant="h4" color="var(--columbia-blue)">
            Співвиконавці
          </Typography>
            <MySelect
                options={authorOptions}
                value={authorsTrack.map(author => author.id.toString())}
                onChange={(ids) => {
                    const selectedAuthors = authors.filter(author => ids.includes(author.id.toString()));
                    setAuthorsTrack(selectedAuthors);
                }}
            />
        </Box>
        <Box
          width={"95%"}
          margin={"0 auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Typography variant="h4" color="var(--columbia-blue)">
            Жанр
          </Typography>
          <MySelect
            options={genres.map(genre => ({
              label: genre.name,
              value: genre.id.toString(),
            }))}
            value={genresTrack.map(genre => genre.id.toString())}
            onChange={(ids) => {
              const selectedGenres = genres.filter(genre => ids.includes(genre.id.toString()));
              setGenresTrack(selectedGenres);
            }}
          />
        </Box>
      </Box>
      <Box
      margin={"24px auto 0 auto"}
      width={"95%"}
      height={"100px"}
      display={"grid"}
      gridTemplateColumns={"repeat(2, 1fr)"}
      gap={"10px"}
    >
      {/* Обложка */}
      <Box
        bgcolor={"#6B7280"}
        borderRadius={"15px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
        onClick={handleImageClick}
      >
        {imageFile ? (
          <>
            <Box
              component="img"
              src={URL.createObjectURL(imageFile)}
              alt="cover"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <Box
            width={"80%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"row"}
            gap={"12px"}
          >
            <Typography variant="h4" textAlign={"center"}>
              Додайте обкладинку
            </Typography>
            <Box
              component={"img"}
              src={addCover}
              alt={"addCover"}
              height={"74px"}
              width={"74px"}
            />
          </Box>
        )}

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Box>

      {/* Аудио */}
      <Box
        bgcolor={"#6B7280"}
        borderRadius={"15px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ cursor: "pointer", position: "relative" }}
        onClick={handleAudioClick}
      >
        {audioFile ? (
          <>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                padding: "0 20px",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              🎵
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeAudio();
              }}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <Box
            width={"80%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"row"}
            gap={"12px"}
          >
            <Typography variant="h4" textAlign={"center"}>
              Додайте свій аудіотрек
            </Typography>
            <Box
              component={"img"}
              src={addAudio}
              alt={"addAudio"}
              height={"74px"}
              width={"74px"}
            />
          </Box>
        )}

        <input
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          onChange={handleAudioChange}
          style={{ display: "none" }}
        />
      </Box>
    </Box>
      <Box
        margin={"24px auto 0 auto"}
        width={"95%"}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Box color={"#FFFFFF"} display={"flex"} alignItems={"center"} onClick={createTrack} sx={{
            cursor: "pointer"
        }}>
          <Box
            component={"img"}
            src={addTrack}
            alt={"addTrack"}
            height={"20px"}
            width={"20px"}
          />
          <Typography
            ml={1}
            variant="mainRL"
            display={"flex"}
            justifyContent={"center"}
          >
            Додати трек
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Step4;