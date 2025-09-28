import {Box, IconButton, Typography} from "@mui/material";

interface SettingItemProps {
    text: string;
    imgSrc: string;
}

const SettingSmallItem = ({ text, imgSrc }: SettingItemProps) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "left",
                    gap: "24px",
                }}
            >
                <Box
                    component="img"
                    src={imgSrc}
                    alt={text}
                    sx={{
                        width: "30px",
                        height: "30px",
                        objectFit: "contain"
                    }}
                />
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "var(--dark-purple)",
                        flex: 1,
                        marginTop: "6px"
                    }}
                >
                    {text}
                </Typography>

                <IconButton>
                    <Box
                        component="img"
                        src="./src/assets/arrowSettingRight.png"
                        alt="arrow right"
                        sx={{ width: "20px", height: "20px" }}
                    />
                </IconButton>
            </Box>
            <Box
                sx={{
                    height: "4px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0, 144, 255, 0.6)",
                    width: "100%",

                }}
            />
        </Box>
    );
};

export default SettingSmallItem;