package com.example.server.dto.Album;

import com.example.server.dto.User.UserSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class AlbumSimpleDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private String createdAt;
    private Set<UserSimpleDto> authors;
}
