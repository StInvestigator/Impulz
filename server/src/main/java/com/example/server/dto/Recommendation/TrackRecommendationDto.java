package com.example.server.dto.Recommendation;

import com.example.server.model.Track;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
public class TrackRecommendationDto extends RecommendationDto {
    private Long durationSec;
    private String albumTitle;
    private java.util.Set<String> authors;

    public static TrackRecommendationDto fromEntity(Track track) {
        TrackRecommendationDto dto = new TrackRecommendationDto();
        dto.setId(track.getId());
        dto.setTitle(track.getTitle());
        dto.setDurationSec(track.getDurationSec());

        if (track.getAlbum() != null) {
            dto.setImageUrl(track.getAlbum().getImageUrl());
            dto.setAlbumTitle(track.getAlbum().getTitle());
        }

        dto.setAuthors(track.getAuthors().stream()
                .map(author -> author.getUser().getUsername())
                .collect(Collectors.toSet()));

        return dto;
    }
}
