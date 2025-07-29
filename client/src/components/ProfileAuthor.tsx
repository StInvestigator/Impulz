import {Box, Button, IconButton, Typography} from "@mui/material";
import playImage from "../assets/play.svg";
import type {FC} from "react";

interface ProfileAuthorProps{
    name: string;
}

const ProfileAuthor: FC<ProfileAuthorProps> = ({name}) => {
    return (
        <>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} position={"relative"} height={"100%"} >
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} position={"relative"} height={"100%"} width={"700px"}>
                    {/*Имя автора*/}
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgcolor={"white"}
                        borderRadius={"50%"}
                        height={"400px"}
                        width={"400px"}
                        position={"absolute"}
                        left={0}
                        zIndex={2}
                    >
                        <Typography variant={"h2"} fontSize={"36px"}>
                            {name}
                        </Typography>
                    </Box>

                    {/*Фотография автора*/}
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgcolor={"gray"}
                        borderRadius={"50%"}
                        height={"400px"}
                        width={"400px"}
                        position={"absolute"}
                        left={300}
                        zIndex={1}
                    >
                        <IconButton sx={{padding: 0}}>
                            <Box component={"img"} src={playImage} borderRadius={'50%'} width={"80px"}
                                 height={"80px"}/>
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection="column"
                    gap={"16px"}
                    height={"190px"}
                    width={"85%"}
                    position={"absolute"}
                    bottom={28}
                    zIndex={0}
                >
                    <Box
                        marginRight={4}
                        display={"flex"}
                        flexDirection="column"
                        gap={"16px"}
                    >
                        <Button sx={{
                            borderRadius: "10px",
                            marginLeft: "auto",
                            backgroundColor: "white",
                            color: "black",
                            textTransform: "none"
                        }}>
                            <Typography variant={"h2"} fontSize={"24px"} fontFamily={'"Manrope", sans-serif'}>
                                Підписатися
                            </Typography>
                        </Button>
                        <Box
                            bgcolor={"#716060"}
                            boxSizing={"border-box"}
                            padding={"6px 12px"}
                            borderRadius={"10px"}
                            marginLeft={"auto"}
                            width={"60%"}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                        >
                            <Box textAlign={"center"} color={"white"}>
                                <Typography variant={"h2"} fontSize={"24px"} fontFamily={'"Manrope", sans-serif'}>
                                    123 555
                                </Typography>
                                <Typography variant={"h3"} fontFamily={'"Manrope", sans-serif'}>
                                    Слухачів за місяць
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        bgcolor={"#716060"}
                        padding={"6px 12px"}
                        boxSizing={"border-box"}
                        borderRadius={"10px"}
                        marginLeft={"auto"}
                        width={"61%"}
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                    >
                        <Box textAlign={"center"} color={"white"}>
                            <Typography variant={"h2"} fontSize={"24px"} fontFamily={'"Manrope", sans-serif'}>
                                123 555
                            </Typography>
                            <Typography variant={"h3"} fontFamily={'"Manrope", sans-serif'}>
                                Слухачів за місяць
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProfileAuthor;