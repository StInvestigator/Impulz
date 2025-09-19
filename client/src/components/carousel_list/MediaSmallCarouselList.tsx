import type { FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import {
  isAlbumSimpleDto,
  isPlaylistSimpleDto,
  isTrackSimpleDto,
  type MediaItemSimpleDto,
} from "../../models/DTO/MediaItemSimpleDto.ts";
import AlbumSmallItem from "../items/album/AlbumSmallItem.tsx";
import TrackSmallItem from "../items/track/TrackSmallItem.tsx";
import Skeleton from "@mui/material/Skeleton";

interface MediaSmallCarouselListProps {
  medias: MediaItemSimpleDto[];
  itemWidth: number;
  isLoading: boolean;
  error: string | null;
  name: string;
}

const MediaSmallCarouselList: FC<MediaSmallCarouselListProps> = ({
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
                url="/recommendations/mixed-today"
            >
              {medias.map((media) => {
                if (isTrackSimpleDto(media)) {
                  return (
                      <TrackSmallItem
                          key={`track-${media.id}`}
                          track={media}
                      />
                  );
                } else if (isAlbumSimpleDto(media)) {
                  return (
                      <AlbumSmallItem
                          key={`album-${media.id}`}
                          album={media}
                          itemWidth={itemWidth}
                          color="dark"
                      />
                  );
                } else if (isPlaylistSimpleDto(media)) {
                  return (
                      <PublicPlaylistSmallItem
                          key={`playlist-${media.id}`}
                          playlist={media}
                          itemWidth={itemWidth}
                          color="dark"
                      />
                  );
                }
                return null;
              })}
            </ListCarousel>
        )}
      </>
  );
};

export default MediaSmallCarouselList;