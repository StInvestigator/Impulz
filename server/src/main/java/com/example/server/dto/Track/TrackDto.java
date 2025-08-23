package com.example.server.dto.Track;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Subtitle.SubtitleSimpleDto;
import com.example.server.model.Album;
import lombok.Data;

import java.util.Set;

@Data
public class TrackDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private String fileUrl;
    private Long durationSec;
    private Album album;
    private Set<AuthorSimpleDto> authors;
    private Set<GenreSimpleDto> genre;
    private Set<SubtitleSimpleDto> subtitles;
}
