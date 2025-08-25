package com.example.server.dto.Album;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Album;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class AlbumSimpleDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private Set<AuthorSimpleDto> authors;

    public static AlbumSimpleDto fromEntity(Album album){
        AlbumSimpleDto dto = new AlbumSimpleDto();
        dto.setId(album.getId());
        dto.setTitle(album.getTitle());
        dto.setImgUrl(album.getImageUrl());
        dto.setAuthors(album.getAuthors().stream()
                .map(AuthorSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        return dto;
    }
}
