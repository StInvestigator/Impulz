import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import type { FC } from "react";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import { useNavigate } from "react-router-dom";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";

interface AuthorItemProps {
  author: AuthorSimpleDto;
}

const AuthorAverageItem: FC<AuthorItemProps> = ({ author }) => {
  const navigate = useNavigate();

  const { playAuthorPopularTracks } = usePlayTrack();

  const handlePlayClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      await playAuthorPopularTracks(
        author.id,
        author.name,
        3
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      width="100%"
      boxSizing={"border-box"}
      borderRadius={"1000px 1000px 0 0"}
      sx={{
        background: "var(--gradient-pink)",
      }}
    >
      <Box
        bgcolor="gray"
        mx={"auto"}
        borderRadius={"50%"}
        sx={{
          width: "min(270px, 90%)",
          aspectRatio: "1 / 1",
          backgroundImage: `url(${author.imgUrl || ""})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          "&:hover": { cursor: "pointer" }
        }}
        onClick={() => navigate(`/author/${author.id}`)}

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
        </Box>
        <IconButton
          onClick={(e) => handlePlayClick(e)}
          sx={{ padding: 0 }}
          disableRipple={true}
        >
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
