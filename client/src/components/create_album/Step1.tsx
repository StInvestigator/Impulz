import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import addImage from "../../assets/addImage.svg";

const Step1 = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        color="var(--columbia-blue)"
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        Завантаж обкладинку альбому
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        color={"white"}
        mt={2}
      >
        <Box display={"flex"}>
          <CheckIcon
            sx={{
              width: "20px",
              height: "20px",
              color: "var(--orange-peel)",
            }}
          />
          <Typography
            variant="mainRL"
            display={"flex"}
            justifyContent={"center"}
          >
            формат: JPG/PNG
          </Typography>
        </Box>
        <Box display={"flex"}>
          <CheckIcon
            sx={{
              width: "20px",
              height: "20px",
              color: "var(--orange-peel)",
            }}
          />
          <Typography
            variant="mainRL"
            display={"flex"}
            justifyContent={"center"}
          >
            розмір: мін. 292×360 px
          </Typography>
        </Box>
        <Box display={"flex"}>
          <CheckIcon
            sx={{
              width: "20px",
              height: "20px",
              color: "var(--orange-peel)",
            }}
          />
          <Typography
            variant="mainRL"
            display={"flex"}
            justifyContent={"center"}
          >
            вага файлу: до 5 МБ
          </Typography>
        </Box>
      </Box>
      <Box
        width={"292px"}
        height={"360px"}
        bgcolor={"white"}
        borderRadius={"10px"}
        mt={3}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mx={"auto"}
      >
        <Box component={"img"} src={addImage} alt="addImage" />
      </Box>
    </Box>
  );
};

export default Step1;