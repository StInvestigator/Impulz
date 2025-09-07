package com.example.server.dto.Track;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.model.Track;
import com.example.server.model.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class TrackSimpleDto
{
    private Long id;
    private String title;
    private Long durationSec;
    private String imgUrl;
    private Set<AuthorSimpleDto> authors;
    private String album;
    private Long albumId;

    public static TrackSimpleDto fromEntity(Track track) {
        TrackSimpleDto dto = new TrackSimpleDto();
        Album album = track.getAlbum();

        dto.setId(track.getId());
        dto.setTitle(track.getTitle());
        dto.setAlbum(album.getTitle());
        dto.setAlbumId(album.getId());
        dto.setImgUrl(album.getImageUrl());
        dto.setDurationSec(track.getDurationSec());
        dto.setAuthors(track.getAuthors().stream()
                .map(AuthorSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        return dto;
    }
}