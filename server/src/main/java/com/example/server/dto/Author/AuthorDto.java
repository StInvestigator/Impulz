package com.example.server.dto.Author;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class AuthorDto
{
    private String bio;
    private String imgUrl;
    private Long followersCount;
    private Long subscriptions;
    private Set<TrackSimpleDto> tracks;
    private Set<AlbumSimpleDto> albums;
}
