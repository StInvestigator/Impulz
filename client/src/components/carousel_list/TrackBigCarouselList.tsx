import { useEffect, type FC } from "react";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import ListCarousel from "../ListCarousel.tsx";
import { Skeleton, type TypographyProps } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchTop20TracksByWeek } from "../../store/reducers/action-creators/tracks.ts";

interface TrackListProps {
  title: string;
  variant: TypographyProps["variant"];
  itemWidth: number;
  itemHeight: number;
}

const TrackBigCarouselList: FC<TrackListProps> = ({
  itemWidth,
  itemHeight,
  title,
  variant,
}) => {
  const dispatch = useAppDispatch();
  const { topTracks, loading, error } = useAppSelector((state) => state.track);

  useEffect(() => {
    dispatch(fetchTop20TracksByWeek());
  }, [dispatch]);

  return (
    <>
      {loading || error ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={itemHeight + 60}
          sx={{ borderRadius: "10px" }}
        />
      ) : (
        <ListCarousel
          gap={24}
          count_items={topTracks.length}
          variant={variant}
          title={title}
          bgColor={"var(--dark-purple)"}
          textColor={"var(--orange-peel)"}
        >
          {topTracks.map((track, index) => (
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
