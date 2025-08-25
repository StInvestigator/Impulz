package com.example.server.dto.Genre;

import com.example.server.model.Genre;
import lombok.Data;

@Data
public class GenreSimpleDto
{
    private Long id;
    private String name;

    public static GenreSimpleDto fromEntity(Genre genre){
        GenreSimpleDto dto = new GenreSimpleDto();
        dto.setId(genre.getId());
        dto.setName(genre.getName());
        return dto;
    }
}
