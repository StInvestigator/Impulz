package com.example.server.controller;

import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.dto.Recommendation.RecommendationDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.service.author.AuthorService;
import com.example.server.service.genre.GenreService;
import com.example.server.service.playlist.PlaylistService;
import com.example.server.service.recommendation.RecommendationService;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController
{
    private final AuthorService authorService;
    private final TrackService trackService;
    private final GenreService genreService;
    private final PlaylistService playlistService;
    private final RecommendationService recommendationService;

    @GetMapping("/simpleDto/findTop20AuthorsOfMonth")
    public List<AuthorSimpleDto> findTop20AuthorsOfMonth() {
        List<Author> authors = authorService.findTop20AuthorsOfMonth();
        return authors.stream()
                .map(AuthorSimpleDto::fromEntity)
                .toList();
    }

    @GetMapping("/simpleDto/findTop5Genres")
    public List<GenreSimpleDto> findTop5Genres(){
        List<Genre> genres = genreService.findTop5Genres();
        return genres.stream()
                .map(GenreSimpleDto::fromEntity)
                .toList();
    }

    @GetMapping("/simpleDto/find20MostListenedTracksByWeek")
    public List<TrackSimpleDto> get20MostListenedTracksByWeek(){
        List<Track> tracks = trackService.findTop20MostPlayedTracksThisWeek();
        return tracks.stream()
                .map(TrackSimpleDto::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/simpleDto/findTop20PlaylistsByFavorites")
    public List<PlaylistSimpleDto> findTop20PlaylistsByFavorites(){
        List<Playlist> playlists = playlistService.findTop20PlaylistsByFavorites();
        return playlists.stream()
                .map(PlaylistSimpleDto::fromEntity)
                .toList();
    }

    @GetMapping("/today")
    public List<RecommendationDto> getTodayRecommendations(){
        return recommendationService.getTodayRecommendations();
    }
}
