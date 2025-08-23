package com.example.server.dto.Playlist;

import com.example.server.dto.User.UserSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class PlaylistSimpleDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private String createdAt;
    private Set<UserSimpleDto> authors;
}
