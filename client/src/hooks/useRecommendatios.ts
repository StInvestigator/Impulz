import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {AppDispatch, RootState} from "../store/store.ts";
import {
    fetchMixedRecommendations,
    refreshMixedRecommendations
} from "../store/reducers/action-creators/recommendation.ts";
import {clearRecommendations} from "../store/reducers/RecommendationSlice.ts";

export const useMixedRecommendations = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        items,
        isLoading,
        error,
        page,
        hasMore,
        isRefreshing
    } = useSelector((state: RootState) => state.Recommendations);

    const load = useCallback((page: number = 0, size: number = 10) => {
        dispatch(fetchMixedRecommendations({ page, size }));
    }, [dispatch]);

    const refresh = useCallback(() => {
        dispatch(refreshMixedRecommendations());
    }, [dispatch]);

    const loadMore = useCallback(() => {
        if (hasMore && !isLoading) {
            dispatch(fetchMixedRecommendations({ page: page + 1, size: 10 }));
        }
    }, [dispatch, hasMore, isLoading, page]);

    const clear = useCallback(() => {
        dispatch(clearRecommendations());
    }, [dispatch]);

    return {
        items,
        isLoading,
        error,
        page,
        hasMore,
        isRefreshing,
        load,
        refresh,
        loadMore,
        clear,
        isEmpty: items.length === 0,
        hasError: error !== null,
    };
};