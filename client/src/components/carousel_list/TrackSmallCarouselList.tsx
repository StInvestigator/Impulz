import { type FC } from "react";
import ListCarousel from "../ListCarousel.tsx";
import { Skeleton, type TypographyProps } from "@mui/material";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";
import TrackTrueSmallItem from "../items/track/TrackTrueSmallItem.tsx";

interface TrackListProps {
  tracks: TrackSimpleDto[];
  isLoading: boolean;
  error: string | null;
  title: string;
  itemWidth: number;
  variant: TypographyProps["variant"];
  url: string;
}

const TrackSmallCarouselList: FC<TrackListProps> = ({
  tracks,
  isLoading,
  error,
  itemWidth,
  title,
  variant,
  url,
}) => {
  return (
    <>
      {isLoading || error ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={285}
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          gap={16}
          count_items={tracks.length}
          variant={variant}
          title={title}
          bgColor="var(--gradient-purple-rose)"
          textColor="var(--dark-purple)"
          url={url}
        >
          {tracks.map((track, index) => (
            <TrackTrueSmallItem key={index} track={track} itemWidth={itemWidth} color="dark" />
          ))}
        </ListCarousel>
      )}
    </>
  );
};

export default TrackSmallCarouselList;




