import type { FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";
import Skeleton from "@mui/material/Skeleton";

interface PlaylistListProps {
  playlists: PlaylistSimpleDto[];
  isLoading: boolean;
  error: string | null;
  itemWidth: number;
  name: string;
}

const PlaylistCarouselList: FC<PlaylistListProps> = ({
  playlists,
  itemWidth,
  name,
  isLoading,
  error,
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
          gap={24}
          count_items={playlists.length}
          bgColor={"var(--dark-purple)"}
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
