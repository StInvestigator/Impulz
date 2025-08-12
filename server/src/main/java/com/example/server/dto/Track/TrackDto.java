package com.example.server.dto.Track;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Subtitle.SubtitleSimpleDto;
import lombok.Data;

import java.util.Set;

@Data
public class TrackDto
{
    private Long id;
    private String name;
    private String imgUrl;
    private String fileUrl;
    private String timePlay;
    private Set<AuthorSimpleDto> authors;
    private Set<GenreSimpleDto> genre;
    private Set<SubtitleSimpleDto> subtitles;
}
