import { Box, Button} from "@mui/material";
import MyProfile from "../components/profiles/MyProfile";
import MyModal from "../components/ui/MyModal";
import { useEffect, useState } from "react";
import MyStepper from "../components/ui/MyStepper";
import Step1 from "../components/create_album/Step1";
import Step2 from "../components/create_album/Step2";
import Step3 from "../components/create_album/Step3";
import Step4 from "../components/create_album/Step4";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createAlbum } from "../store/reducers/action-creators/album";
import type { TrackCreationFullDto } from "../models/DTO/track/TrackCreationFullDto";
import AlbumList from "../components/lists/AlbumList";

function OfficeArtistPage() {
  const {profile} = useAppSelector(state => state.profile);

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const [image, setImage] = useState<File | null>(null);
  const [nameAlbum, setNameAlbum] = useState<string>("");
  const [dateRelease, setDateRelease] = useState<string>("");
  const [tracks, setTracks] = useState<TrackCreationFullDto[]>([]);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (activeStep > 4 || activeStep < 1) {
      setOpen(false);
      setActiveStep(1);
    }
  }, [activeStep]);

  const createAlbumClick = () => {
    dispatch(createAlbum({
      metadata: {
        title: nameAlbum,
        authorIds: profile.authorDto ? [profile.authorDto.id] : [],
        releaseDate: dateRelease,
        tracks: tracks.map(track => ({
          title: track.title,
          authorIds: track.authors.map(author => author.id.toString()),
          genreIds: track.genres.map(genre => genre.id),
          clientCoverName: track.clientCoverName?.name || "",
          clientFileName: track.clientFileName?.name || "",
        })),
      },
      coverFile: image ,
      trackFiles: tracks.map(track => track.clientFileName),
      trackCoverFiles: tracks.map(track => track.clientCoverName),
    }));
  };

  return (
    <>     
      <MyProfile />
      {profile?.authorDto && (
        <Button onClick={() => setOpen(true)}>Создать альбом</Button>
      )}
      <Box component={"section"} marginTop={"20px"} >
          <AlbumList albums={profile?.authorDto?.albums || []}/>
      </Box>
      <MyModal open={open} setOpen={setOpen}>
        <MyStepper activeStep={activeStep} />
        {activeStep === 1 && <Step1 image={image} setImage={setImage} />}
        {activeStep === 2 && <Step2 nameAlbum={nameAlbum} setNameAlbum={setNameAlbum} />}
        {activeStep === 3 && <Step3 dateRelease={dateRelease} setDateRelease={setDateRelease} />}
        {activeStep === 4 && <Step4 tracks={tracks} setTracks={setTracks} />}
        <Box
          display={"grid"}
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
            height: "52px",
          }}
          gap={"20px"}
          mt={3}
        >
          <Button onClick={() => setActiveStep(step => step - 1)}
            sx={{
              color: "var(--dark-purple)",
              bgcolor: "white",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Назад
          </Button>
          <Button onClick={() => {
            if (activeStep === 4) {
              createAlbumClick();
            }
            setActiveStep(step => step + 1);
          }}

            sx={{
              color: "var(--dark-purple)",
              bgcolor: "var(--orange-peel)",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            {activeStep === 4 ? "Зберегти альбом" : "Далі"}
          </Button>
        </Box>
      </MyModal>
    </>
  );
}

export default OfficeArtistPage;
