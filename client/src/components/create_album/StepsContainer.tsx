import { Box } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface StepsContainerProps {
    activeStep: number; // индекс активного шага
    children: ReactNode[]; // массив шагов
}

const StepsContainer: FC<StepsContainerProps> = ({ activeStep, children }) => {
    return (
        <Box>
            {children.map((child, index) => (
                <Box
                    key={index}
                    sx={{
                        display: activeStep === index + 1 ? "block" : "none",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {child}
                </Box>
            ))}
        </Box>
    );
};

export default StepsContainer;
