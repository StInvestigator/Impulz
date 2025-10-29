import { Box, OutlinedInput, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

interface Step3Props {
  dateRelease: string;
  setDateRelease: (date: string) => void;
}

const Step3 = ({ dateRelease, setDateRelease }: Step3Props) => {

  const {t} = useTranslation("step3")

  return (
    <Box>
      <Typography
        variant="h3"
        color="var(--columbia-blue)"
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        {t("title-date-release")}
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
            {t("title-rule-1")}
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
            {t("title-rule-2")}
          </Typography>
        </Box>
      </Box>
      <Box mt={3} display={"flex"} justifyContent={"center"}>
        <OutlinedInput
            placeholder={"Введіть дату публікації"}
            type="date"
            value={dateRelease}
            onChange={(e) => setDateRelease(e.target.value)}
            sx={{
                width: "231px",
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

export default Step3;