package com.example.server.dto.Album;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Album;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class AlbumDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private Set<AuthorSimpleDto> authors;
    private OffsetDateTime releaseDate;
    private Set<TrackSimpleDto> tracks;

    public static AlbumDto fromEntity(Album album){
        AlbumDto dto = new AlbumDto();
        dto.setId(album.getId());
        dto.setTitle(album.getTitle());
        dto.setImgUrl(album.getImageUrl());
        dto.setReleaseDate(album.getReleaseDate());
        dto.setAuthors(album.getAuthors().stream()
                .map(AuthorSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        dto.setTracks(album.getTracks().stream()
                .map(TrackSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        return dto;
    }
}
