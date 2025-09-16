package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.service.author.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService
{
    private final AlbumRepository albumRepository;
    private final AuthorService authorService;

    public Album getAlbumById(Long id){
        return albumRepository.findById(id).orElseThrow();
    }

    public void create(Album album){
        albumRepository.save(album);
    }

    public void delete(Long id){
        albumRepository.deleteById(id);
    }

    public Page<Album> getRecommendedAlbumsToday(Pageable pageable) {
        return albumRepository.findRecommendedAlbumsToday(pageable);
    }

    public Page<Album> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable){
        return albumRepository.findPopularAlbumsByUserRecentGenres(userId, pageable);
    }

    @Override
    public Page<Album> findByAuthor(String authorId, Pageable pageable) {
        return albumRepository.findByAuthorsContainingAndReleaseDateLessThanEqual(authorService.getAuthorById(authorId), OffsetDateTime.now(), pageable);
    }

    @Override
    public Page<Album> findCollaborationsByAuthor(String authorId, Pageable pageable) {
        return albumRepository.findAlbumsByAuthorWithMultipleAuthors(authorId, pageable);
    }

    @Override
    public Page<Album> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable) {
        return albumRepository.findByAuthors_IdAndReleaseDateLessThanEqualOrderByReleaseDateDesc(authorId, OffsetDateTime.now(), pageable);
    }

    @Override
    public Page<Album> findNewAlbumsByGenre(Long genreId, Pageable pageable) {
        return albumRepository.findNewAlbumsByGenre(genreId,pageable);
    }
}
