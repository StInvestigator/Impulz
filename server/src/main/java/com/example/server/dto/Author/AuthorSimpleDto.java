package com.example.server.dto.Author;

import com.example.server.model.Author;
import lombok.Data;


@Data
public class AuthorSimpleDto
{
    private String id;
    private String name;
    private String imgUrl;

    public static AuthorSimpleDto fromEntity(Author author){
        AuthorSimpleDto dto = new AuthorSimpleDto();
        dto.setId(author.getId());
        dto.setName(author.getUser().getUsername());
        dto.setImgUrl(author.getUser().getAvatarUrl());
        return dto;
    }
}