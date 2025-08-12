package com.example.server.dto.Track;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class TrackSimpleDto
{
    private Long id;
    private String name;
    private String timePlay;
    private String imgUrl;
    private String fileUrl;
    private Set<UserSimpleDto> authors;
    private AlbumSimpleDto album;
}