package com.example.server.dto.Track;

import com.example.server.model.Track;
import lombok.Data;

@Data
public class TrackSimpleDtoWithFavorite
{
    TrackSimpleDto track;
    Boolean isFavorite;

    public static TrackSimpleDtoWithFavorite fromEntity(Track track, Boolean isFavorite) {
        TrackSimpleDtoWithFavorite dto = new TrackSimpleDtoWithFavorite();
        dto.setTrack(TrackSimpleDto.fromEntity(track));
        dto.setIsFavorite(isFavorite);
        return dto;
    }
}