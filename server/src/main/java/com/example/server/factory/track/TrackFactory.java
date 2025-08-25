package com.example.server.factory.track;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.GenreRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import com.example.server.model.Track;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TrackFactory
{
    private final AlbumRepository albumRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public Track createTrack(String title, Long albumId, List<String> authorIds,List<Long> genreIds){
        Track track = new Track();
        track.setTitle(title);
        track.setLikes(0L);
        track.setTotalPlays(0L);
        track.setCreatedAt(OffsetDateTime.now());

        track.setAlbum(albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + albumId)));

        if(authorIds != null && !authorIds.isEmpty()){
            Set<Author> authors = new HashSet<>(authorRepository.findAllById(authorIds));
            track.setAuthors(authors);
        }

        if(genreIds != null & !genreIds.isEmpty()){
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(genreIds));
            track.setGenres(genres);
        }

        return track;
    }
}
