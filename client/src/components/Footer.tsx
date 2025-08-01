import {Box, IconButton, Link, Typography} from "@mui/material";
import instagramImage from "../assets/footer/instagram.svg"
import twitterImage from "../assets/footer/twitter.svg"
import facebookImage from "../assets/footer/facebook.svg"
import { useTranslation } from 'react-i18next';


const Footer = () => {

    const { t } = useTranslation('footer')

    return (
        <Box component={"footer"} height={"390px"} bgcolor={"black"} marginLeft={"320px"} padding={"60px 114px 60px 24px"} boxSizing={"border-box"}>
            <Box display={"flex"} justifyContent={"space-between"} height={"100%"}>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"mainSbL"} color={"#919496"}>
                        {t("title-company")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-about-us")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-vacancy")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            For the Record
                        </Link>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"} color={"#919496"}>
                        {t("title-legal-information")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"mainSbL"} color={"#919496"}>
                        {t("title-community")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-for-author")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-for-developer")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-for-advertisers")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-for-investors")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-for-providers")}
                        </Link>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"} color={"#919496"}>
                        {t("title-center-security")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"mainSbL"} color={"#919496"}>
                        {t("title-usefull-links")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-support")}
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            {t("button-webplayer")}
                        </Link>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"} color={"#919496"}>
                        {t("title-police-confidentiality")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant={"mainSbL"} color={"#919496"}>
                        {t("title-subscribs")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"}>
                        <Link href="#" variant={"mainRM"}>
                            Premium Individual
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            Premium Duo
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            Premium Family
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            Premium Student
                        </Link>
                        <Link href="#" variant={"mainRM"}>
                            Impulz Free
                        </Link>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"} color={"#919496"}>
                        {t("title-policy-cookie")}
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
                    <Typography variant={"mainRS"} marginTop={"auto"} color={"#919496"}>
                        © 2025 Impulz
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;