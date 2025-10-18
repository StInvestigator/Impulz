package com.example.server.dto.Genre;

import com.example.server.model.Genre;
import lombok.Data;

@Data
public class GenreSimpleDto
{
    private Long id;
    private String name;
    private String uaName;
    private String imgUrl;

    public static GenreSimpleDto fromEntity(Genre genre){
        GenreSimpleDto dto = new GenreSimpleDto();
        dto.setId(genre.getId());
        dto.setUaName(genre.getUaName());
        dto.setName(genre.getName());
        dto.setImgUrl(genre.getImageUrl());
        return dto;
    }
}
