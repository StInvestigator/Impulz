import { Alert, Box, Button, Fade, Snackbar, Typography } from "@mui/material";
import MyProfile from "../components/profiles/MyProfile";
import MyModal from "../components/ui/MyModal";
import { useEffect, useState } from "react";
import MyStepper from "../components/ui/MyStepper";
import Step1 from "../components/create_album/Step1";
import Step2 from "../components/create_album/Step2";
import Step3 from "../components/create_album/Step3";
import Step4 from "../components/create_album/Step4";
import StepsContainer from "../components/create_album/StepsContainer";
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createAlbum, fetchAlbumsByAuthor, fetchUnreleasedAlbumsByAuthor } from "../store/reducers/action-creators/album";
import type { TrackCreationFullDto } from "../models/DTO/track/TrackCreationFullDto";
import AlbumList from "../components/lists/AlbumList";
import spiraleImg from "../assets/spirale.svg";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { setCurrentPage } from "../store/reducers/PageSlice";

function OfficeArtistPage() {
  const { profile } = useAppSelector(state => state.profile);
  const { albums, unreleasedAuthorAlbums } = useAppSelector(state => state.album);
  const route = useAppNavigate();
  const { t } = useTranslation(["officeArtistPage", "authorPage", "other", "errors"])

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [nameAlbum, setNameAlbum] = useState<string>("");
  const [dateRelease, setDateRelease] = useState<string>("");
  const [tracks, setTracks] = useState<TrackCreationFullDto[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1))
    dispatch(fetchAlbumsByAuthor({ authorId: profile.id, size: 10 }))
    dispatch(fetchUnreleasedAlbumsByAuthor({ authorId: profile.id, size: 10 }))
  }, [dispatch, profile.id])

  useEffect(() => {
    if (activeStep > 4 || activeStep < 1) {
      setOpen(false);
      setActiveStep(1);
    }
  }, [activeStep]);

  const nextStepClick = () => {
    if (!image) {
      setError(t("errors:error-no-image"))
      return
    }

    if (activeStep === 2 && nameAlbum.trim().length === 0) {
      setError(t("errors:error-no-album-name"))
      return
    }

    if (activeStep === 3 && dateRelease.trim().length === 0) {
      setError(t("errors:error-no-release-date"))
      return
    }

    if (activeStep === 4 && tracks.length === 0) {
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
      coverFile: image,
      trackFiles: tracks.map(track => track.clientFileName),
      trackCoverFiles: tracks.map(track => track.clientCoverName),
    })).unwrap().then(() => {
      setOpen(false);
      setActiveStep(1)
      dispatch(fetchAlbumsByAuthor({ authorId: profile.id, size: 10 }))
      dispatch(fetchUnreleasedAlbumsByAuthor({ authorId: profile.id, size: 10 }))
    }).then(() => {
      setSnackbarMessage(t("officeArtistPage:title-success"))
      setSnackbarType("success")
      setSnackbarOpen(true)
    }).catch(() => {
      setOpen(false);
      setActiveStep(1);
      setIsLoading(false);
      setSnackbarMessage(t("errors:error-creating-album"))
      setSnackbarType("error")
      setSnackbarOpen(true)
    });
  };

  return (
    <>
      <MyProfile />


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
        <Box component={"img"} src={spiraleImg} position={"absolute"} bottom={-150} width={"100%"} zIndex={-1} />
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


      {albums.length > 0 && (
        <Box component={"section"} mt={"60px"}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
            <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
              {t("officeArtistPage:title-released-albums")}
            </Typography>
            <Button onClick={() => route(`/author/${profile.id}/released`)} sx={{
              height: "32px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "var(--dark-purple)",
              color: "var(--columbia-blue)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none"
            }}>
              {t("other:button-watch-all")}
            </Button>
          </Box>
          <AlbumList albums={albums} />
        </Box>
      )}

      {unreleasedAuthorAlbums.length > 0 && (
        <Box component={"section"} mt={"60px"}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
            <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
              {t("officeArtistPage:title-unreleased-albums")}
            </Typography>
            <Button onClick={() => route(`/author/${profile.id}/unreleased`)} sx={{
              height: "32px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "var(--dark-purple)",
              color: "var(--columbia-blue)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none"
            }}>
              {t("other:button-watch-all")}
            </Button>
          </Box>
          <AlbumList albums={unreleasedAuthorAlbums} />
        </Box>
      )}

      <MyModal open={open} setOpen={setOpen}>
        <MyStepper activeStep={activeStep} />
        <StepsContainer activeStep={activeStep}>
          <Step1 image={image} setImage={setImage} />
          <Step2 nameAlbum={nameAlbum} setNameAlbum={setNameAlbum} />
          <Step3 dateRelease={dateRelease} setDateRelease={setDateRelease} />
          <Step4 tracks={tracks} setTracks={setTracks} albumImage={image} myName={profile.username} />
        </StepsContainer>
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
            else {
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
            {isLoading ? t("authorPage:button-save-album") : activeStep === 4 ? t("officeArtistPage:button-save-album") : t("officeArtistPage:button-next")}
          </Button>
        </Box>
      </MyModal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          severity={snackbarType}
          onClose={() => setSnackbarOpen(false)}
          sx={{
            width: "100%",
            borderRadius: "10px",
            fontWeight: 600,
            backgroundColor:
              snackbarType === "success"
                ? "rgba(76, 175, 80, 0.9)"
                : "rgba(244, 67, 54, 0.9)",
            color: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default OfficeArtistPage;
