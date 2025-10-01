import { Box, OutlinedInput, Typography } from "@mui/material";

const Step4 = () => {
  return (
    <Box>
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
                    width: "584px",
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
            <OutlinedInput
                placeholder={"Введіть назву треку"}
                type="text"
                sx={{
                    width: "584px",
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
            Жанр
            </Typography>
            <OutlinedInput
                placeholder={"Введіть жанр"}
                type="text"
                sx={{
                    width: "584px",
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
    </Box>
  );
};

export default Step4;