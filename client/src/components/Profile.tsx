import { Box, Button, IconButton, Typography } from "@mui/material";
import playImage from "../assets/play.svg";
import {type FC, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import type {AuthorDto} from "../models/AuthorDto.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchAuthorPlaysByMonth} from "../store/reducers/action-creators/author.ts";

interface ProfileProps {
  author: AuthorDto;
  type: "user" | "author";
}

const Profile: FC<ProfileProps> = ({  author,type }) => {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const { playsByMonth } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(author.id){
      dispatch(fetchAuthorPlaysByMonth(author.id));
    }
  }, [dispatch,author.id]);

  const { t } = useTranslation("authorPage");

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        height={"100%"}
      >
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
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"white"}
            borderRadius={"50%"}
            height={"400px"}
            width={"400px"}
            position={"absolute"}
            left={0}
            zIndex={2}
          >
            <Typography variant={"h2"}>{author.name}</Typography>
          </Box>

          {/*Фотография автора*/}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"gray"}
            borderRadius={"50%"}
            height={"400px"}
            width={"400px"}
            position={"absolute"}
            left={300}
            zIndex={1}
          >
            <IconButton sx={{ padding: 0 }}>
              <Box
                component={"img"}
                src={playImage}
                borderRadius={"50%"}
                width={"80px"}
                height={"80px"}
              />
            </IconButton>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          flexDirection="column"
          gap={"12px"}
          height={"190px"}
          width={"85%"}
          position={"absolute"}
          bottom={28}
          zIndex={0}
        >
          {type === "author" && (
            <Box
              height={"100%"}
              marginRight={4}
              display={"flex"}
              justifyContent={"flex-end"}
              flexDirection="column"
              gap={"16px"}
            >
              <Button
                onClick={() =>
                  isSubscribe ? setIsSubscribe(false) : setIsSubscribe(true)
                }
                sx={{
                  minWidth: "175px",
                  borderRadius: "10px",
                  marginLeft: "auto",
                  backgroundColor: "white",
                  color: "black",
                  textTransform: "none",
                  padding: "12px",
                }}
              >
                <Typography
                  variant={"h3"}
                  lineHeight={"24px"}
                  fontFamily={'"Manrope", sans-serif'}
                >
                  {isSubscribe
                    ? t("button-unsubscribe")
                    : t("button-subscribe")}
                </Typography>
              </Button>

              <Box
                bgcolor={"#716060"}
                boxSizing={"border-box"}
                padding={"6px 12px"}
                borderRadius={"10px"}
                marginLeft={"auto"}
                width={"60%"}
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Box textAlign={"center"} color={"white"}>
                  <Typography
                    variant={"h3"}
                    fontSize={"24px"}
                    fontFamily={'"Manrope", sans-serif'}
                  >
                    {author.followersCount}
                  </Typography>
                  <Typography
                    variant={"mainSbM"}
                    fontFamily={'"Manrope", sans-serif'}
                  >
                    {t("title-subscribers")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <Box
            bgcolor={"#716060"}
            padding={"6px 12px"}
            boxSizing={"border-box"}
            borderRadius={"10px"}
            marginLeft={"auto"}
            width={"61%"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Box textAlign={"center"} color={"white"}>
              <Typography
                variant={"h3"}
                fontSize={"24px"}
                fontFamily={'"Manrope", sans-serif'}
                height={"24px"}
              >
                {playsByMonth}
              </Typography>
              <Typography
                variant={"mainSbM"}
                fontFamily={'"Manrope", sans-serif'}
              >
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
