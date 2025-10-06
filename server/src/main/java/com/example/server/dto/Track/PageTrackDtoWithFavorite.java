package com.example.server.dto.Track;

import com.example.server.dto.Page.PageDto;
import com.example.server.model.Track;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageTrackDtoWithFavorite
{
    PageDto<TrackDto> page;
    List<Long> favoriteIds;

    public static PageTrackDtoWithFavorite fromEntity(Page<Track> tracks, List<Long> ids) {
        PageTrackDtoWithFavorite dto = new PageTrackDtoWithFavorite();
        dto.setPage(new PageDto<>(tracks.map(TrackDto::fromEntity)));
        dto.setFavoriteIds(ids);
        return dto;
    }
}