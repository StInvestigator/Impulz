package com.example.server.service.recommendation;

import com.example.server.dto.Recommendation.RecommendationDto;

import java.util.List;

public interface RecommendationService
{
    List<RecommendationDto> getTodayRecommendations();
}
