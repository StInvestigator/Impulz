import { Box, Button} from "@mui/material";
import MyProfile from "../components/profiles/MyProfile";
import MyModal from "../components/ui/MyModal";
import { useEffect, useState } from "react";
import MyStepper from "../components/ui/MyStepper";
import Step1 from "../components/create_album/Step1";
import Step2 from "../components/create_album/Step2";
import Step3 from "../components/create_album/Step3";

function MyProfilePage() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (activeStep > 4 || activeStep < 1) {
      setOpen(false);
      setActiveStep(1);
    }
  }, [activeStep]);

  return (
    <>
      <MyProfile />
      <Button onClick={() => setOpen(true)}>Создать альбом</Button>

      <MyModal open={open} setOpen={setOpen}>
        <MyStepper activeStep={activeStep} />
        {activeStep === 1 && <Step1 />}
        {activeStep === 2 && <Step2 />}
        {activeStep === 3 && <Step3 />}
        <Box
          display={"grid"}
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
            height: "52px",
          }}
          gap={"20px"}
          mt={3}
        >
          <Button onClick={() => setActiveStep(step => step - 1)}
            sx={{
              color: "var(--dark-purple)",
              bgcolor: "white",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Назад
          </Button>
          <Button onClick={() => setActiveStep(step => step + 1)}
            sx={{
              color: "var(--dark-purple)",
              bgcolor: "var(--orange-peel)",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            {activeStep === 4 ? "Зберегти альбом" : "Далі"}
          </Button>
        </Box>
      </MyModal>
    </>
  );
}

export default MyProfilePage;
