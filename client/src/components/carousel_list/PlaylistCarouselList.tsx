import type { FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import Skeleton from "@mui/material/Skeleton";
import type {PlaylistDto} from "../../models/PlaylistDto.ts";

interface PlaylistListProps {
  playlists: PlaylistDto[];
  isLoading: boolean;
  error: string | null;
  itemWidth: number;
  name: string;
  url: string;
}

const PlaylistCarouselList: FC<PlaylistListProps> = ({
  playlists,
  itemWidth,
  name,
  isLoading,
  error,
  url,
}) => {
  return (
    <>
      {isLoading || error ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="280px"
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          title={name}
          variant={"h3"}
          gap={16}
          count_items={playlists.length}
          bgColor={"var(--dark-purple)"}
          textColor={"var(--deep-sky-blue)"}
          url={url}
        >
          {playlists.map((playlist, index) => (
            <PublicPlaylistSmallItem
              key={index}
              playlist={playlist}
              itemWidth={itemWidth}
            />
          ))}
        </ListCarousel>
      )}
    </>
  );
};

export default PlaylistCarouselList;
