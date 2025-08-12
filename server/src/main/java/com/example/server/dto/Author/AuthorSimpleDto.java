package com.example.server.dto.Author;

import lombok.Data;


@Data
public class AuthorSimpleDto
{
    private Long id;
    private String name;
    private String imgUrl;
}