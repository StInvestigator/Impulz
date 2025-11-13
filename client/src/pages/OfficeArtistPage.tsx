import { Box, Button, Typography} from "@mui/material";
import MyProfile from "../components/profiles/MyProfile";
import MyModal from "../components/ui/MyModal";
import { useEffect, useState } from "react";
import MyStepper from "../components/ui/MyStepper";
import Step1 from "../components/create_album/Step1";
import Step2 from "../components/create_album/Step2";
import Step3 from "../components/create_album/Step3";
import Step4 from "../components/create_album/Step4";
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createAlbum, fetchAlbumsByAuthor } from "../store/reducers/action-creators/album";
import type { TrackCreationFullDto } from "../models/DTO/track/TrackCreationFullDto";
import AlbumList from "../components/lists/AlbumList";
import spiraleImg from "../assets/spirale.svg";
import { useTranslation } from "react-i18next";
import keycloak from "../keycloak";

function OfficeArtistPage() {
  const {profile} = useAppSelector(state => state.profile);
  const {albums} = useAppSelector(state => state.album);

  const {t} = useTranslation(["officeArtistPage", "errors"])

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [nameAlbum, setNameAlbum] = useState<string>("");
  const [dateRelease, setDateRelease] = useState<string>("");
  const [tracks, setTracks] = useState<TrackCreationFullDto[]>([]);

  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchAlbumsByAuthor({authorId: profile.id, size : 10}))
    }, [dispatch,profile.id])
  
  useEffect(() => {
    if (activeStep > 4 || activeStep < 1) {
      setOpen(false);
      setActiveStep(1);
    }
  }, [activeStep]);

  const nextStepClick = () => {
    if(!image){
      setError(t("errors:error-no-image"))
      return
    }

    if(activeStep === 2 && nameAlbum.trim().length === 0){
      setError(t("errors:error-no-album-name"))
      return
    }

    if(activeStep === 3 && dateRelease.trim().length === 0){
      setError(t("errors:error-no-release-date"))
      return
    }

    if(activeStep === 4 && tracks.length === 0){
      setError(t("errors:error-no-tracks-in-album"))
      return
    }

    setActiveStep(step => step + 1);
    setError("")
  }

  const createAlbumClick = () => {
    
    setIsLoading(true);

    dispatch(createAlbum({
      metadata: {
        title: nameAlbum,
        authorIds: profile.authorDto ? [profile.id] : [],
        releaseDate: dateRelease,
        tracks: tracks.map(track => ({
          title: track.title,
          authorIds: [profile.id].concat(track.authors.map(author => author.id.toString())),
          genreIds: track.genres.map(genre => genre.id),
          clientCoverName: track.clientCoverName?.name || "",
          clientFileName: track.clientFileName?.name || "",
        })),
      },
      coverFile: image ,
      trackFiles: tracks.map(track => track.clientFileName),
      trackCoverFiles: tracks.map(track => track.clientCoverName),
    })).unwrap().then(() => {
      setOpen(false);
      setActiveStep(1)
    });
  };

  return (
    <>     
      <MyProfile />
      {/* {profile?.authorDto?.albums && (
        <> */}
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"20px"} height={"310px"} position={"relative"} overflow={"hidden"} sx={{
          background: "var(--gradient-oranges)",
        }}>
          <Box alignItems={"center"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={"70%"}>
            <Typography variant={"h1"}>{t("officeArtistPage:title-h1")}</Typography>
            <Button onClick={() => setOpen(true)} sx={{
              marginTop: "auto",
              padding: "12px 24px",
              bgcolor: "var(--dark-purple)",
              color: "white",
              borderRadius: "10px",
            }}>
              <Typography variant={"h2"} color="white">{t("officeArtistPage:button-create-album")}</Typography>
            </Button>
          </Box>
          <Box component={"img"} src={spiraleImg} position={"absolute"} bottom={-150} width={"100%"} zIndex={-1}/>
        </Box>
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
          mt={2}
        >
          <Box display="flex">
            <CheckIcon sx={{ width: 28, height: 28, color: '#23BE6E' }} />
            <Typography variant="mainRL" display="flex" justifyContent="center">
              {t("officeArtistPage:title-rule-1")}       
            </Typography>
          </Box>
          <Box display="flex">
            <CheckIcon sx={{ width: 28, height: 28, color: '#23BE6E' }} />
            <Typography variant="mainRL" display="flex" justifyContent="center">
              {t("officeArtistPage:title-rule-2")}       
            </Typography>
          </Box>
          <Box display="flex">
            <CheckIcon sx={{ width: 28, height: 28, color: '#23BE6E' }} />
            <Typography variant="mainRL" display="flex" justifyContent="center">
              {t("officeArtistPage:title-rule-3")}       
            </Typography>
          </Box>
          <Box display="flex">
            <CheckIcon sx={{ width: 28, height: 28, color: '#23BE6E' }} />
            <Typography variant="mainRL" display="flex" justifyContent="center">
              {t("officeArtistPage:title-rule-4")}       
            </Typography>
          </Box>
        </Box>
        {/* </>
      )} */}
      <Box component={"section"} marginTop={"20px"} >
          <AlbumList albums={albums || []}/>
      </Box>
      <MyModal open={open} setOpen={setOpen}>
        <MyStepper activeStep={activeStep} />
        {activeStep === 1 && <Step1 image={image} setImage={setImage} />}
        {activeStep === 2 && <Step2 nameAlbum={nameAlbum} setNameAlbum={setNameAlbum} />}
        {activeStep === 3 && <Step3 dateRelease={dateRelease} setDateRelease={setDateRelease} />}
        {activeStep === 4 && <Step4 tracks={tracks} setTracks={setTracks} albumImage={image} myName={profile.username}/>}
        <Box mt={"20px"}>
          <Typography color="red" variant="mainRL">
            {error}
          </Typography>
        </Box>
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
            {t("officeArtistPage:button-back")}
          </Button>
          <Button onClick={() => {
            if (activeStep === 4) {
              createAlbumClick();
            }
            else{
              nextStepClick()
            }
          }}
            disabled={isLoading}
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
            {isLoading ? "Loading..." : activeStep === 4 ? t("officeArtistPage:button-save-album") : t("officeArtistPage:button-next")}
          </Button>
        </Box>
      </MyModal>
    </>
  );
}

export default OfficeArtistPage;
