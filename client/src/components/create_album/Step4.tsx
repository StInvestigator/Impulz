import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";
import MySelect from "../ui/MySelect";
import addCover from '../../assets/addImage.svg';
import addAudio from '../../assets/addAudio.svg';
import addTrack from '../../assets/iconPlus.svg';
import playTrack from '../../assets/playOrangeColor.svg';
import editTrack from '../../assets/edit-icon.svg';
import deleteTrack from '../../assets/delete-icon.svg';

const TrackItem = () => {
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
      {/* Заголовок по центру (абсолютно позиционирован) */}
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
          Трек 1
        </Typography>
      </Box>

      {/* Обкладинка */}
      <Box
        width="60px"
        height="60px"
        bgcolor="#6B7280"
        borderRadius="8px"
        flexShrink={0}
      />

      {/* Інформація про трек */}
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
          Назва треку
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
            Співвиконавець 1, kkkkkkkkkkkkkkkkkkkkkkkkkkkk
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
            Жанр jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          </Typography>
        </Box>
      </Box>

      {/* Кнопки */}
      <IconButton sx={{ padding: 0, flexShrink: 0 }}>
        <Box
          component="img"
          src={playTrack}
          alt="playTrack"
          height="28px"
          width="28px"
        />
      </IconButton>
      <IconButton sx={{ padding: 0, flexShrink: 0 }}>
        <Box
          component="img"
          src={editTrack}
          alt="editTrack"
          height="28px"
          width="28px"
        />
      </IconButton>
      <IconButton sx={{ padding: 0, flexShrink: 0 }}>
        <Box
          component="img"
          src={deleteTrack}
          alt="deleteTrack"
          height="28px"
          width="28px"
        />
      </IconButton>
    </Box>

  );
};

const Step4 = () => {
  return (
    <Box>
      <TrackItem />
      <Typography
        variant="h3"
        color="var(--orange-peel)"
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        Додайте трек, назву, співвиконавців і жанр
      </Typography>
      
      <Box mt={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"10px"}>
        <Box width={"95%"} margin={"0 auto"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography
                variant="h4"
                color="var(--columbia-blue)"
            >
            Назва треку
            </Typography>
            <OutlinedInput
                placeholder={"Введіть назву треку"}
                type="text"
                sx={{
                    width: "589px",
                    height: "44px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "15px",
                    color: "#6B7280",
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: "16px",
                    fontWeight: 400,
                    '& .MuiInputBase-input::placeholder': {
                        color: '#6B7280',
                        opacity: 1,
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "0px 12px" // внутренние отступы для текста
                    }
                }}
            />
        </Box>
        <Box width={"95%"} margin={"0 auto"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography
                variant="h4"
                color="var(--columbia-blue)"
            >
            Співвиконавці
            </Typography>
            <MySelect />
        </Box>
        <Box width={"95%"} margin={"0 auto"} display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography
                variant="h4"
                color="var(--columbia-blue)"
            >
            Жанр
            </Typography>
            <MySelect />
        </Box>
      </Box>
      <Box margin={"24px auto 0 auto"} width={"95%"} height={"100px"} display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"} gap={"10px"}>
        <Box bgcolor={"#6B7280"} borderRadius={"15px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Box width={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"row"} gap={"12px"}>
            <Typography variant="h4" textAlign={"center"} display={"flex"} alignItems={"center"}>
              Додайте обкладинку
            </Typography>
            <Box component={"img"} src={addCover} alt={"addCover"} height={"74px"} width={"74px"}/>
          </Box>
        </Box>
        <Box bgcolor={"#6B7280"} borderRadius={"15px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Box width={"80%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"row"} gap={"12px"}>
            <Typography variant="h4" textAlign={"center"} display={"flex"} alignItems={"center"}>
              Додайте свій аудіотрек
            </Typography>
            <Box component={"img"} src={addAudio} alt={"addAudio"} height={"74px"} width={"74px"}/>
          </Box>
        </Box>
      </Box>
      <Box margin={"24px auto 0 auto"} width={"95%"} display={"flex"} justifyContent={"flex-end"}>
        <Box color={"#FFFFFF"} display={"flex"} alignItems={"center"}>
          <Box component={"img"} src={addTrack} alt={"addTrack"} height={"20px"} width={"20px"}/>
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