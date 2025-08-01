import {type FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface AuthorItemProps {
    author: string;
    itemWidth: number;
}

const AuthorSmallItem: FC<AuthorItemProps> = ({author, itemWidth}) => {
    const navigate = useNavigate()

    const { t } = useTranslation('other')

    return (
        <Box
            onClick={() => navigate(`/author/${author}`)}
            sx={{
                width: itemWidth,
                backgroundColor: "#ABA5A5",
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                padding: "4px",
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
                "&:hover": {
                    backgroundColor: "gray"
                }
            }}
        >
            <Box position={"relative"} width={itemWidth} height={itemWidth} borderRadius={"50%"} bgcolor={"white"}>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        top: 80,
                        left: 80,
                    }}
                >
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>
            <Box display="flex" flexDirection="column" flexGrow={1} textAlign={"center"} mt={1}>
                <Typography gutterBottom variant="mainSbL">
                    {author}
                </Typography>
                <Typography variant="mainRM">
                    {t("title-author")}
                </Typography>
            </Box>
        </Box>
    );
};

export default AuthorSmallItem;