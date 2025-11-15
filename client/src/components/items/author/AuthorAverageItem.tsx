import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import type { FC } from "react";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import { useNavigate } from "react-router-dom";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { AuthorContextMenu } from "../../contextMenu/AuthorContextMenu.tsx";
import { fetchPopularTracksByAuthorForPlayer } from "../../../store/reducers/action-creators/tracks.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import profileDefault from "../../../assets/profile_icon.svg"

interface AuthorItemProps {
  author: AuthorSimpleDto;
}

const AuthorAverageItem: FC<AuthorItemProps> = ({ author }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();

  const { playTrackList } = usePlayTrack();

  const handlePlayClick = async (event: React.MouseEvent) => {
          event.stopPropagation();
  
          const result = await dispatch(fetchPopularTracksByAuthorForPlayer({
              authorId: author.id,
              size: 1000
          }));
  
          if (fetchPopularTracksByAuthorForPlayer.fulfilled.match(result)) {
              playTrackList(result.payload, 0);
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
        onContextMenu={(e) => handleContextMenu(e, author.id)}
        bgcolor="gray"
        mx={"auto"}
        borderRadius={"50%"}
        sx={{
          width: "min(270px, 90%)",
          aspectRatio: "1 / 1",
          backgroundImage: `url(${author.imgUrl || profileDefault})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          "&:hover": { cursor: "pointer" }
        }}
        onClick={() => navigate(`/author/${author.id}`)}

      />
      <Box
        onContextMenu={(e) => handleContextMenu(e, author.id)}
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
          sx={{
            padding: 0,
            transition: 'transform 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              transform: 'scale(1.1)',
            }
          }}
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
      <AuthorContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        author={author}
      />
    </Box>
  );
};

export default AuthorAverageItem;
