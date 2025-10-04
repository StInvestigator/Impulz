package com.example.server.dto.Album;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Track.TrackCreationDto;
import com.example.server.dto.Track.TrackSimpleDto;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Data
public class AlbumCreationDto {
    private String title;
    private Set<String> authorIds;
    private LocalDate releaseDate;
    private List<TrackCreationDto> tracks;
}
