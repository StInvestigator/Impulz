package com.example.server.service.recommendation;

import com.example.server.dto.Recommendation.AlbumRecommendationDto;
import com.example.server.dto.Recommendation.RecommendationDto;
import com.example.server.dto.Recommendation.TrackRecommendationDto;
import com.example.server.service.album.AlbumService;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService
{
    private final TrackService trackService;
    private final AlbumService albumService;

    public List<RecommendationDto> getTodayRecommendations(){
        List<TrackRecommendationDto> trackRecommendations = trackService
                .getRecommendedTracksToday()
                .stream()
                .map(TrackRecommendationDto::fromEntity)
                .toList();
        List<AlbumRecommendationDto> albumRecommendations = albumService
                .getRecommendedAlbumsToday()
                .stream()
                .map(AlbumRecommendationDto::fromEntity)
                .toList();

        List<RecommendationDto> recommendations = new ArrayList<>();
        recommendations.addAll(trackRecommendations);
        recommendations.addAll(albumRecommendations);

        Collections.shuffle(recommendations);
        return recommendations;
    }

    public List<RecommendationDto> getPersonalizedRecommendationsByRecentGenres(String userId){
        List<TrackRecommendationDto> trackRecommendations = trackService
                .findPopularTrackByUserRecentGenres(userId)
                .stream()
                .map(TrackRecommendationDto::fromEntity)
                .toList();
        List<AlbumRecommendationDto> albumRecommendations = albumService
                .findPopularAlbumsByUserRecentGenres(userId)
                .stream()
                .map(AlbumRecommendationDto::fromEntity)
                .toList();

        List<RecommendationDto> recommendations = new ArrayList<>();
        recommendations.addAll(trackRecommendations);
        recommendations.addAll(albumRecommendations);

        Collections.shuffle(recommendations);
        return recommendations;
    }
}
