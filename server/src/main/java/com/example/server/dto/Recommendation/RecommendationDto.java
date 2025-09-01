package com.example.server.dto.Recommendation;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TrackRecommendationDto.class, name = "track"),
        @JsonSubTypes.Type(value = AlbumRecommendationDto.class, name = "album")
})
public abstract class RecommendationDto
{
    private Long id;
    private String title;
    private String imageUrl;
}
