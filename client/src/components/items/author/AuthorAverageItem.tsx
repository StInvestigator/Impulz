import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import type { FC } from "react";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";

interface AuthorItemProps {
  author: AuthorSimpleDto;
}

const AuthorAverageItem: FC<AuthorItemProps> = ({ author }) => {

  return (
    <Box
      width="100%"
      boxSizing={"border-box"}
      bgcolor={"#B9B9B9"}
      borderRadius={"1000px 1000px 0 0"}
    >
      <Box
        bgcolor="gray"
        mx={"auto"}
        borderRadius={"50%"}
        sx={{ width: "min(270px, 90%)", aspectRatio: "1 / 1" }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        padding={"24px"}
        boxSizing={"border-box"}
        alignItems="center"
        width={"100%"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"mainSbL"} gutterBottom>
            {author.name}
          </Typography>
          {/* <Typography variant={"mainRM"}>
            {t("title-album")} &middot; {author.}
          </Typography> */}
        </Box>
        <IconButton sx={{ padding: 0 }}>
          <Box
            component={"img"}
            src={playImage}
            borderRadius={"50%"}
            width={"30px"}
            height={"30px"}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AuthorAverageItem;
