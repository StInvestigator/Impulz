import { Box, Button, IconButton, Typography } from "@mui/material";
import playImage from "../../assets/play.svg";
import React, {type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AuthorDto } from "../../models/AuthorDto";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAuthorPlaysByMonth } from "../../store/reducers/action-creators/author";
import bgCoverImg from "../../assets/bg-cover.svg";
import keycloak from "../../keycloak";
import {usePlayTrack} from "../../hooks/usePlayTrack.tsx";

interface AuthorProfileProps {
  author: AuthorDto;
  onSubscriptionChange?: () => void;
  isSubscribed?: boolean;
  subscriptionLoading?: boolean;
}

const AuthorProfile: FC<AuthorProfileProps> = ({
                                                 author,
                                                 onSubscriptionChange,
                                                 isSubscribed = false,
                                                 subscriptionLoading = false,
                                               }) => {
  const { playsByMonth } = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("authorPage");

  const [followers, setFollowers] = useState(author.followersCount);
  const [isHovered, setIsHovered] = useState(false);
  const { playAuthorPopularTracks } = usePlayTrack();

  useEffect(() => {
    setFollowers(author.followersCount);
  }, [author.followersCount]);

  useEffect(() => {
    if (author.id) {
      dispatch(fetchAuthorPlaysByMonth(author.id));
    }
  }, [dispatch, author.id]);

  const handleSubscriptionClick = () => {
    if (onSubscriptionChange) {
      onSubscriptionChange();
    }
    setFollowers((prev) =>
        isSubscribed ? Math.max(prev - 1, 0) : prev + 1
    );
  };

  const handlePlayClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await playAuthorPopularTracks(
          author.id,
          author.name,
          3
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <>
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            height={"450px"}
            sx={{ backgroundColor: "var(--dark-purple)" }}
        >
          <Box component={"img"} src={bgCoverImg} position={"absolute"} top={0} left={0} width={"100%"} height={"100%"} />
          {/* Контейнер для фото и имени автора */}
          <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
              height={"100%"}
              width={"700px"}
          >
            {/*Имя автора*/}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="var(--columbia-blue)"
                borderRadius="50%"
                border="10px solid #FF990099"
                boxSizing="border-box"
                height="400px"
                width="400px"
                position="absolute"
                left={0}
                zIndex={2}
            >
              <Typography variant="h2">{author.name}</Typography>
            </Box>

            {/* Фотография автора */}
            <Box
                display="flex"
                bgcolor="var(--dark-purple)"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                border="5px solid #FF990099"
                height="400px"
                width="400px"
                position="absolute"
                left={300}
                zIndex={1}
                sx={{
                  backgroundImage: `url(${author.imgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => handlePlayClick(e)}
            >
              <IconButton
                  disableRipple
                  sx={{
                    padding: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
              >
                <Box
                    component="img"
                    src={playImage}
                    borderRadius="50%"
                    width="80px"
                    height="80px"
                    sx={{
                      transition: "transform 0.2s ease"
                    }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
              display="flex"
              justifyContent="flex-end"
              flexDirection="column"
              gap="12px"
              height="190px"
              width="85%"
              position="absolute"
              bottom={28}
              zIndex={0}
          >
            <Box
                height="100%"
                marginRight={4}
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
                gap="16px"
            >
              {keycloak.subject !== author.id && <Button
                  onClick={handleSubscriptionClick}
                  disabled={subscriptionLoading}
                  sx={{
                    minWidth: "175px",
                    borderRadius: "50px",
                    marginLeft: "auto",
                    backgroundColor: isSubscribed ? "#716060" : "var(--orange-peel)",
                    color: isSubscribed ? "white" : "black",
                    textTransform: "none",
                    padding: "12px",
                    "&:hover": {
                      backgroundColor: isSubscribed ? "#5a4d4d" : "#f0f0f0",
                    },
                  }}
              >
                <Typography variant="h3" lineHeight="24px" fontFamily={'"Manrope", sans-serif'}>
                  {subscriptionLoading
                      ? t("button-loading")
                      : isSubscribed
                          ? t("button-unsubscribe")
                          : t("button-subscribe")}
                </Typography>
              </Button>
              }

              <Box
                  bgcolor="var(--columbia-blue)"
                  boxSizing="border-box"
                  padding="6px 12px"
                  borderRadius="10px"
                  marginLeft="auto"
                  width="40%"
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
              >
                <Box textAlign="center">
                  <Typography variant="h3">
                    {followers}
                  </Typography>
                  <Typography variant="mainSbM" fontWeight={700}>
                    {t("title-subscribers")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
                bgcolor="var(--columbia-blue)"
                padding="6px 12px"
                boxSizing="border-box"
                borderRadius="10px"
                marginLeft="auto"
                width="40%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
            >
              <Box textAlign="center">
                <Typography variant="h3" fontSize="24px" fontFamily={'"Manrope", sans-serif'} height="24px">
                  {playsByMonth}
                </Typography>
                <Typography variant="mainSbM" fontFamily={'"Manrope", sans-serif'}>
                  {t("title-listeners-month")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
  );
};

export default AuthorProfile;