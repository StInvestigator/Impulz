import type { FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import {
  isAlbumSimpleDto,
  isPlaylistDto,
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
  url: string;
}

const MediaSmallCarouselList: FC<TracklistListProps> = ({
  medias,
  itemWidth,
  name,
  isLoading,
  error,
  url
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
          gap={16}
          count_items={medias.length}
          bgColor="var(--gradient-purple-rose)"
          textColor="var(--dark-purple)"
          url={url}
        >
          {
            medias
                .filter(media => isPlaylistDto(media) || isAlbumSimpleDto(media))
                .map(media => (
                    isPlaylistDto(media) ? (
                        <PublicPlaylistSmallItem
                            key={media.id}
                            playlist={media}
                            itemWidth={itemWidth}
                            color="dark"
                        />
                    ) : (
                        <AlbumSmallItem
                            key={media.id}
                            album={media}
                            itemWidth={itemWidth}
                            color="dark"
                        />
                    )
                ))
          }
        </ListCarousel>
      )}
    </>
  );
};
export default MediaSmallCarouselList;
