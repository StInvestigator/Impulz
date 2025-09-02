import type { FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import {
  isAlbumSimpleDto,
  isPlaylistSimpleDto,
  type MediaItemSimpleDto,
} from "../../models/DTO/MediaItemSimpleDto.ts";
import AlbumSmallItem from "../items/album/AlbumSmallItem.tsx";
import Skeleton from "@mui/material/Skeleton";

interface TracklistListProps {
  medias: MediaItemSimpleDto[];
  itemWidth: number;
  isLoading: boolean;
  error: string | null;
  name: string;
}

const MediaSmallCarouselList: FC<TracklistListProps> = ({
  medias,
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
          height="285px"
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          title={name}
          variant={"h3"}
          gap={24}
          count_items={medias.length}
          bgColor="var(--gradient-purple-rose)"
          textColor="var(--dark-purple)"
        >
          {medias.map((media, index) => (
            <>
              {isPlaylistSimpleDto(media) && (
                <PublicPlaylistSmallItem
                  key={index}
                  playlist={media}
                  itemWidth={itemWidth}
                  color="dark"
                />
              )}
              {isAlbumSimpleDto(media) && (
                <AlbumSmallItem
                  key={index}
                  album={media}
                  itemWidth={itemWidth}
                  color="dark"
                />
              )}
            </>
          ))}
        </ListCarousel>
      )}
    </>
  );
};
export default MediaSmallCarouselList;
