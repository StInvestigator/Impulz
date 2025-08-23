package com.example.server.controller;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Subtitle.SubtitleSimpleDto;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.model.Track;
import com.example.server.model.User;
import com.example.server.service.music.MusicServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/track")
public class TrackController
{
    @Autowired
    private TrackRepository trackRepository;
    @Autowired
    private MusicServiceImpl musicService;

    @RequestMapping("/simpleDto/{id}")
    public TrackSimpleDto getSimpleTrack(@PathVariable Long id){
        Track track = trackRepository.getTrackById(id);
        TrackSimpleDto trackSimpleDto = new TrackSimpleDto();
        Album album = track.getAlbum();
        trackSimpleDto.setId(track.getId());
        trackSimpleDto.setTitle(track.getTitle());
        trackSimpleDto.setAlbum(album.getTitle());
        trackSimpleDto.setImgUrl(album.getImageUrl());
        trackSimpleDto.setAuthors(track.getAuthors().stream()
                .map(Author::getUser)
                .map(User::getUsername)
                .collect(Collectors.toSet())
        );
        trackSimpleDto.setDurationSec(track.getDurationSec());
        return trackSimpleDto;
    }

    @RequestMapping("/Dto/{id}")
    public TrackDto getTrackDto(@PathVariable Long id){
        Track track = trackRepository.getTrackById(id);
        TrackDto trackDto = new TrackDto();
        Album album = track.getAlbum();

        trackDto.setId(id);
        trackDto.setTitle(track.getTitle());
        trackDto.setAlbum(album);
        trackDto.setImgUrl(album.getImageUrl());
        trackDto.setDurationSec(track.getDurationSec());

        trackDto.setAuthors(track.getAuthors().stream()
                .map(author ->{
                    AuthorSimpleDto authorSimpleDto = new AuthorSimpleDto();
                    authorSimpleDto.setId(author.getId());
                    authorSimpleDto.setName(author.getUser().getUsername());
                    authorSimpleDto.setImgUrl(author.getUser().getAvatarUrl());
                    return authorSimpleDto;
                }).collect(Collectors.toSet()));

        trackDto.setGenre(track.getGenres().stream()
                .map(genre -> {
                    GenreSimpleDto genreSimpleDto = new GenreSimpleDto();
                    genreSimpleDto.setId(genre.getId());
                    genreSimpleDto.setName(genre.getName());
                    return genreSimpleDto;
                }).collect(Collectors.toSet()));

        trackDto.setSubtitles(track.getSubtitles().stream()
                .map(subtitles -> {
                    SubtitleSimpleDto subtitleSimpleDto = new SubtitleSimpleDto();
                    subtitleSimpleDto.setId(subtitles.getId());
                    subtitleSimpleDto.setText(subtitles.getText());
                    subtitleSimpleDto.setStartTimeMs(subtitles.getStartTimeMs());
                    subtitleSimpleDto.setEndTimeMs(subtitles.getEndTimeMs());
                    return subtitleSimpleDto;
                }).collect(Collectors.toSet()));

        trackDto.setFileUrl(musicService.getStreamUrl(track.getFileUrl()));
        return trackDto;
    }

}