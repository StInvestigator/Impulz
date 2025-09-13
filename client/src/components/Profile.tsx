import { Box, Button, IconButton, Typography } from "@mui/material";
import playImage from "../assets/play.svg";
import {type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AuthorDto } from "../models/AuthorDto";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAuthorPlaysByMonth } from "../store/reducers/action-creators/author";
import bgCoverImg from "../assets/bg-cover.svg";

interface ProfileProps {
  author: AuthorDto;
  type: "user" | "author";
  onSubscriptionChange?: () => void;
  isSubscribed?: boolean;
  subscriptionLoading?: boolean;
}

const Profile: FC<ProfileProps> = ({
                                     author,
                                     type,
                                     onSubscriptionChange,
                                     isSubscribed = false,
                                     subscriptionLoading = false,
                                   }) => {
  const { playsByMonth } = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("authorPage");

  // локальное состояние подписчиков
  const [followers, setFollowers] = useState(author.followersCount);

  // при изменении самого автора (например, пришёл новый с API) синхронизируем локальный стейт
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
    // обновляем локально
    setFollowers((prev) =>
        isSubscribed ? Math.max(prev - 1, 0) : prev + 1
    );
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
                // backgroundImage: `url(${author.photoUrl})`, <-- здесь нужно передать фото автора
              }}
          >
            <IconButton sx={{ padding: 0 }}>
              <Box component="img" src={playImage} borderRadius="50%" width="80px" height="80px" />
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
          {type === "author" && (
              <Box
                  height="100%"
                  marginRight={4}
                  display="flex"
                  justifyContent="flex-end"
                  flexDirection="column"
                  gap="16px"
              >
                <Button
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
          )}

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

export default Profile;
