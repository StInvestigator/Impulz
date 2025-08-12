package com.example.server.dto.Playlist;

import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class PlaylistDto
{
    private Long id;
    private String title;
    private String imageUrl;
    private Boolean isPublic;
    private UserSimpleDto user;
    private String createdAt;
    private Set<TrackSimpleDto> tracks;
}
