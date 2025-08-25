package com.example.server.dto.Track;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Subtitle.SubtitleSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Track;
import com.example.server.service.music.MusicService;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

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

    public static TrackDto fromEntity(Track track, MusicService musicService){
        TrackDto dto = new TrackDto();
        Album album = track.getAlbum();

        dto.setId(track.getId());
        dto.setTitle(track.getTitle());
        dto.setAlbum(album);
        dto.setImgUrl(album.getImageUrl());
        dto.setDurationSec(track.getDurationSec());

        dto.setAuthors(track.getAuthors().stream()
                .map(author -> {
                    AuthorSimpleDto authorSimpleDto = new AuthorSimpleDto();
                    authorSimpleDto.setId(author.getId());
                    authorSimpleDto.setName(author.getUser().getUsername());
                    authorSimpleDto.setImgUrl(author.getUser().getAvatarUrl());
                    return authorSimpleDto;
                }).collect(Collectors.toSet()));

        dto.setGenre(track.getGenres().stream()
                .map(genre -> {
                    GenreSimpleDto genreSimpleDto = new GenreSimpleDto();
                    genreSimpleDto.setId(genre.getId());
                    genreSimpleDto.setName(genre.getName());
                    return genreSimpleDto;
                }).collect(Collectors.toSet()));

        dto.setSubtitles(track.getSubtitles().stream()
                .map(subtitle -> {
                    SubtitleSimpleDto subtitleSimpleDto = new SubtitleSimpleDto();
                    subtitleSimpleDto.setId(subtitle.getId());
                    subtitleSimpleDto.setText(subtitle.getText());
                    subtitleSimpleDto.setStartTimeMs(subtitle.getStartTimeMs());
                    subtitleSimpleDto.setEndTimeMs(subtitle.getEndTimeMs());
                    return subtitleSimpleDto;
                }).collect(Collectors.toSet()));

        dto.setFileUrl(musicService.getStreamUrl(track.getFileUrl()));
        return dto;
    }
}
