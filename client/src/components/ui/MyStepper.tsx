import { Box, Typography } from "@mui/material";
import type { FC } from "react";

interface MyStepperProps{
    activeStep: number
}

const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4'];

const MyStepper: FC<MyStepperProps> = ({ activeStep }) => {
  return (
    <Box position={"relative"} display="flex" alignItems="center" justifyContent={"space-around"} mt={3}>
        <Box height={"8px"} width={"100%"} position={"absolute"} top={"50%"} zIndex={-1} sx={{
            background: "var(--gradient-orange-rose)"
        }}/>
      {steps.map((label, index) => (
        <Box key={label} display="flex" alignItems="center">
          {/* Круг с номером шага */}
          <Box
            width={index === activeStep - 1 ? 70 : 40}
            height={index === activeStep - 1 ? 70 : 40}
            borderRadius="50%"
            bgcolor={index === activeStep - 1 ? 'var(--dodger-blue)' : 'var(--columbia-blue)'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
          >
            {index === activeStep - 1 && <Typography variant="h2" color="white">
                {index + 1}
            </Typography>}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MyStepper