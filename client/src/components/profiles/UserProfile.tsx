import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../assets/play.svg";
import {type FC } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import bgCoverImg from "../../assets/bg-cover.svg";
import type { UserDto } from "../../models/UserDto";

interface UserProfileProps {
  user: UserDto;
}

const UserProfile: FC<UserProfileProps> = ({
                                     user,
                                   }) => {
  // const { playsByMonth } = useAppSelector((state) => state.author);
  //const dispatch = useAppDispatch();
  // const { t } = useTranslation("authorPage");

//   useEffect(() => {
//     if (user.id) {
//       dispatch(fetchUser(user.id));
//     }
//   }, [dispatch, user.id]);

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

        {/* Контейнер для фото и имени пользователя */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"} 
          height={"100%"}
          width={"700px"}
        >
          {/*Имя пользователя*/}
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
            <Typography variant="h2">{user.username}</Typography>
          </Box>

          {/* Фотография пользователя */}
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
                backgroundImage: `url(${user.imgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
          >
            <IconButton sx={{ padding: 0 }}>
              <Box component="img" src={playImage} borderRadius="50%" width="80px" height="80px" />
            </IconButton>
          </Box>
        </Box>

        {/* <Box
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
                {user.subscriptionsCount}
              </Typography>
              <Typography variant="mainSbM" fontFamily={'"Manrope", sans-serif'}>
                {t("title-listeners-month")}
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default UserProfile;
