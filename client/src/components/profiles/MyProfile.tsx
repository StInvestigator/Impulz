import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../assets/play.svg";
import bgCoverImg from "../../assets/bg-cover.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { fetchAuthorPlaysByMonth } from "../../store/reducers/action-creators/author";
import { useTranslation } from "react-i18next";
import additionalIcon from "../../assets/AdditionalIcon.svg";
import DropdownOptionsMyProfile from "../ui/dropdowns/DropdownOptionsMyProfile";

function MyProfile() {
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [playsByMonth, setPlaysByMonth] = useState<number>(0);
  const { t } = useTranslation("authorPage");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (profile.authorDto?.id) {
      dispatch(fetchAuthorPlaysByMonth(profile.authorDto.id))
        .unwrap()
        .then((value) => {
          setPlaysByMonth(value);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке статистики:", error);
        });
    }
  }, [dispatch, profile.authorDto?.id]);

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
        <Box
          component={"img"}
          src={bgCoverImg}
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
        />

        <IconButton
          sx={{ padding: 0, flexShrink: 0, position: "absolute", top: 20, right: 20 }}
          onClick={handleOpenMenu}
        >
          <Box component="img" src={additionalIcon} height="28px" width="28px" />
        </IconButton>

        <DropdownOptionsMyProfile
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
        />
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
            <Typography variant="h2">
              {profile.authorDto ? profile.authorDto.name : profile.username}
            </Typography>
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
              backgroundImage: `url(${profile.imgUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <IconButton sx={{ padding: 0 }}>
              <Box
                component="img"
                src={playImage}
                borderRadius="50%"
                width="80px"
                height="80px"
              />
            </IconButton>
          </Box>
        </Box>

        {profile.authorDto && (
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
                      {profile.authorDto.followersCount}
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
                  <Typography
                    variant="h3"
                    fontSize="24px"
                    fontFamily={'"Manrope", sans-serif'}
                    height="24px"
                  >
                    {playsByMonth}
                  </Typography>
                  <Typography
                    variant="mainSbM"
                    fontFamily={'"Manrope", sans-serif'}
                  >
                    {t("title-listeners-month")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
      </Box>
    </>
  );
}

export default MyProfile;
