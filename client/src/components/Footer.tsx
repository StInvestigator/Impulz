import {Box, IconButton, Typography} from "@mui/material";
import instagramImage from "../assets/footer/instagram.svg"
import twitterImage from "../assets/footer/twitter.svg"
import facebookImage from "../assets/footer/facebook.svg"
import { useTranslation } from 'react-i18next';


const Footer = () => {

    const { t } = useTranslation('footer')

    return (
        <Box component={"footer"} height={"390px"} bgcolor={"var(--columbia-blue)"} marginLeft={"320px"} padding={"60px 114px 60px 24px"} boxSizing={"border-box"}>
            <Box display={"flex"} justifyContent={"space-between"} height={"100%"}>

                <Box display={"flex"} flexDirection={"column"} color={"var(--dark-purple)"}>
                    <Typography variant={"mainSbL"}>
                        {t("title-company")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"} color={"var(--berkeley-blue)"}>
                        <Typography variant={"mainRM"}>
                            {t("button-about-us")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-vacancy")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            For the Record
                        </Typography>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"}>
                        {t("title-legal-information")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} color={"var(--dark-purple)"}>
                    <Typography variant={"mainSbL"} >
                        {t("title-community")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"} color={"var(--berkeley-blue)"}>
                        <Typography variant={"mainRM"}>
                            {t("button-for-author")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-for-developer")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-for-advertisers")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-for-investors")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-for-providers")}
                        </Typography>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"} >
                        {t("title-center-security")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} color={"var(--dark-purple)"}>
                    <Typography variant={"mainSbL"}>
                        {t("title-usefull-links")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"} color={"var(--berkeley-blue)"}>
                        <Typography variant={"mainRM"}>
                            {t("button-support")}
                        </Typography>
                        <Typography variant={"mainRM"}>
                            {t("button-webplayer")}
                        </Typography>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"}>
                        {t("title-police-confidentiality")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} color={"var(--dark-purple)"}>
                    <Typography variant={"mainSbL"}>
                        {t("title-subscribs")}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} marginTop={"24px"} gap={"12px"} color={"var(--berkeley-blue)"}>
                        <Typography variant={"mainRM"}>
                            Premium Individual
                        </Typography>
                        <Typography variant={"mainRM"}>
                            Premium Duo
                        </Typography>
                        <Typography variant={"mainRM"}>
                            Premium Family
                        </Typography>
                        <Typography variant={"mainRM"}>
                            Premium Student
                        </Typography>
                        <Typography variant={"mainRM"}>
                            Impulz Free
                        </Typography>
                    </Box>
                    <Typography variant={"mainRS"} marginTop={"auto"}>
                        {t("title-policy-cookie")}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} color={"var(--dark-purple)"}>
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
                    <Typography variant={"mainRS"} marginTop={"auto"}>
                        © 2025 Impulz
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;