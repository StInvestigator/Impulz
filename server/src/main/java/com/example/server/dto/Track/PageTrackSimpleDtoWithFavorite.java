package com.example.server.dto.Track;

import com.example.server.dto.Page.PageDto;
import com.example.server.model.Track;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageTrackSimpleDtoWithFavorite
{
    PageDto<TrackSimpleDto> page;
    List<Long> favoriteIds;

    public static PageTrackSimpleDtoWithFavorite fromEntity(Page<Track> tracks, List<Long> ids) {
        PageTrackSimpleDtoWithFavorite dto = new PageTrackSimpleDtoWithFavorite();
        dto.setPage(new PageDto<>(tracks.map(TrackSimpleDto::fromEntity)));
        dto.setFavoriteIds(ids);
        return dto;
    }
}