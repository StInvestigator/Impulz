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


}
