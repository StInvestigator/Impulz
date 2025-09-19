import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaSmallCarouselList from './MediaSmallCarouselList';
import type {AppDispatch, RootState} from "../../store/store.ts";
import {fetchMixedRecommendations} from "../../store/reducers/action-creators/recommendation.ts";

interface MixedRecommendationsCarouselProps {
    name: string;
    itemWidth: number;
}

const MixedRecommendationsCarouselList: React.FC<MixedRecommendationsCarouselProps> = ({
                                                                                       name,
                                                                                       itemWidth,
                                                                                   }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, isLoading, error } = useSelector(
        (state: RootState) => state.Recommendations
    );

    useEffect(() => {
        dispatch(fetchMixedRecommendations({ page: 0, size: 10 }));
    }, [dispatch]);

    return (
        <MediaSmallCarouselList
            medias={items}
            itemWidth={itemWidth}
            name={name}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default MixedRecommendationsCarouselList;