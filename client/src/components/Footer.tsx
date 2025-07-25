import {Box, IconButton, Link, Typography} from "@mui/material";
import instagramImage from "../assets/footer/instagram.svg"
import twitterImage from "../assets/footer/twitter.svg"
import facebookImage from "../assets/footer/facebook.svg"


const Footer = () => {
    return (
        <Box component={"footer"} height={"390px"} bgcolor={"black"} marginLeft={"320px"} padding={"60px 114px 60px 24px"} boxSizing={"border-box"}>
            <Box display={"flex"} justifyContent={"space-between"} height={"100%"}>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"h3"} color={"#919496"}>
                        Компанія
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"h4"}>
                            Про нас
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Вакансії
                        </Link>
                        <Link href="#" variant={"h4"}>
                            For the Record
                        </Link>
                    </Box>
                    <Typography variant={"h4"} marginTop={"auto"} color={"#919496"}>
                        Юридична інформація
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"h3"} color={"#919496"}>
                        Спільноти
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"h4"}>
                            Для виконавців
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Для розробників
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Для рекламодавців
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Для інвесторів
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Для постачальників
                        </Link>
                    </Box>
                    <Typography variant={"h4"} marginTop={"auto"} color={"#919496"}>
                        Центр безпеки й конфіденційності
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"h3"} color={"#919496"}>
                        Корисні посилання
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"h4"}>
                            Підтримка
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Вебпрогравач
                        </Link>
                    </Box>
                    <Typography variant={"h4"} marginTop={"auto"} color={"#919496"}>
                        Політика конфіденційності
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"h3"} color={"#919496"}>
                        Підписки
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"h4"}>
                            Premium Individual
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Premium Duo
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Premium Family
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Premium Student
                        </Link>
                        <Link href="#" variant={"h4"}>
                            Impulz Free
                        </Link>
                    </Box>
                    <Typography variant={"h4"} marginTop={"auto"} color={"#919496"}>
                        Політика щодо файлів cookie
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} flexDirection={"row"} gap={"60px"}>
                        <IconButton>
                            <Box component={"img"} src={instagramImage} alt={"Instagram"}/>
                        </IconButton>
                        <IconButton>
                            <Box component={"img"} src={twitterImage} alt={"Twitter"}/>
                        </IconButton>
                        <IconButton>
                            <Box component={"img"} src={facebookImage} alt={"Facebook"}/>
                        </IconButton>
                    </Box>
                    <Typography variant={"h4"} marginTop={"auto"} color={"#919496"}>
                        © 2025 Impulz
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;