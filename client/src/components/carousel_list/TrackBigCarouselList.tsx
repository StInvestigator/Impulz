import { type FC } from "react";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import ListCarousel from "../ListCarousel.tsx";
import { Skeleton, type TypographyProps } from "@mui/material";
import type {TrackSimpleDto} from "../../models/DTO/track/TrackSimpleDto.ts";

interface TrackListProps {
  tracks: TrackSimpleDto[];
  isLoading: boolean;
  error: string | null;
  title: string;
  variant: TypographyProps["variant"];
  itemWidth: number;
  itemHeight: number;
  url: string;
}

const TrackBigCarouselList: FC<TrackListProps> = ({
  tracks,
  isLoading,
  error,
  itemWidth,
  itemHeight,
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
          height={itemHeight + 60}
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          gap={24}
          count_items={tracks.length}
          variant={variant}
          title={title}
          bgColor={"var(--dark-purple)"}
          textColor={"var(--orange-peel)"}
          url={url}
        >
          {tracks.map((track, index) => (
            <TrackAverageItem
              key={index}
              track={track}
              itemHeight={itemHeight}
              itemWidth={itemWidth}
              isMedal
            />
          ))}
        </ListCarousel>
      )}
    </>
  );
};

export default TrackBigCarouselList;
