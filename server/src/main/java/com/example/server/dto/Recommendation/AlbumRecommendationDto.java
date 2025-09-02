package com.example.server.dto.Recommendation;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.model.Album;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
public class AlbumRecommendationDto extends RecommendationDto {
    private Set<AuthorSimpleDto> authors;

    public static AlbumRecommendationDto fromEntity(Album album) {
        AlbumRecommendationDto dto = new AlbumRecommendationDto();
        dto.setId(album.getId());
        dto.setTitle(album.getTitle());
        dto.setImageUrl(album.getImageUrl());
        dto.setAuthors(album.getAuthors().stream()
                .map(AuthorSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        return dto;
    }

}
