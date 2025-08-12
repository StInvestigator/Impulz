package com.example.server.dto.Album;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class AlbumDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private Set<AuthorSimpleDto> authors;
    private String releaseDate;
    private Set<TrackSimpleDto> tracks;
}
