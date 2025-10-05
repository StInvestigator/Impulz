package com.example.server.dto.Track;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Subtitle.SubtitleSimpleDto;
import com.example.server.model.Track;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class TrackDto {
    private Long id;
    private String title;
    private String imgUrl;
    private Long durationSec;
    private AlbumSimpleDto album;
    private Set<AuthorSimpleDto> authors;
    private Set<GenreSimpleDto> genre;
    private Set<SubtitleSimpleDto> subtitles;

    public static TrackDto fromEntity(Track track) {
        TrackDto dto = new TrackDto();

        dto.setId(track.getId());
        dto.setTitle(track.getTitle());
        dto.setDurationSec(track.getDurationSec());

        if (track.getAlbum() != null) {
            AlbumSimpleDto album = AlbumSimpleDto.fromEntity(track.getAlbum());
            dto.setAlbum(album);
            dto.setImgUrl(track.getImageURl() == null ? album.getImgUrl() : track.getImageURl());
        }

        dto.setAuthors(track.getAuthors().stream()
                .map(author -> {
                    AuthorSimpleDto authorSimpleDto = new AuthorSimpleDto();
                    authorSimpleDto.setId(author.getId());
                    if (author.getUser() != null) {
                        authorSimpleDto.setName(author.getUser().getUsername());
                        authorSimpleDto.setImgUrl(author.getUser().getAvatarUrl());
                    }
                    return authorSimpleDto;
                }).collect(Collectors.toSet()));

        dto.setGenre(track.getGenres().stream()
                .map(GenreSimpleDto::fromEntity).collect(Collectors.toSet()));

        dto.setSubtitles(track.getSubtitles().stream()
                .map(subtitle -> {
                    SubtitleSimpleDto subtitleSimpleDto = new SubtitleSimpleDto();
                    subtitleSimpleDto.setId(subtitle.getId());
                    subtitleSimpleDto.setText(subtitle.getText());
                    subtitleSimpleDto.setStartTimeMs(subtitle.getStartTimeMs());
                    subtitleSimpleDto.setEndTimeMs(subtitle.getEndTimeMs());
                    return subtitleSimpleDto;
                }).collect(Collectors.toSet()));

        return dto;
    }
}
