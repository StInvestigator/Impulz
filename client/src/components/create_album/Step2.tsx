import { Box, OutlinedInput, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Step2 = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        color="var(--columbia-blue)"
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        Дайте назву альбому
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
            до 100 символів
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
            без нецензурних слів
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
            з великої, без CAPS LOCK
          </Typography>
        </Box>
      </Box>
      <Box mt={3} display={"flex"} justifyContent={"center"}>
        <OutlinedInput
            placeholder={"Введіть назву альбому"}
            sx={{
                width: "564px",
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
    </Box>
  );
};

export default Step2;