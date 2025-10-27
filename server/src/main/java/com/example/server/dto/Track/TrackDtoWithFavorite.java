package com.example.server.dto.Track;

import com.example.server.model.Track;
import lombok.Data;

@Data
public class TrackDtoWithFavorite
{
    TrackDto track;
    Boolean isFavorite;

    public static TrackDtoWithFavorite fromEntity(Track track, Boolean isFavorite) {
        TrackDtoWithFavorite dto = new TrackDtoWithFavorite();
        dto.setTrack(TrackDto.fromEntity(track));
        dto.setIsFavorite(isFavorite);
        return dto;
    }
}