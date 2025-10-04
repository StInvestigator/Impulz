package com.example.server.service.elasticsearch;

import com.example.server.dto.Search.GlobalSearchResult;
import com.example.server.elasticsearch.document.*;
import com.example.server.elasticsearch.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService
{
    private final TrackSearchRepository trackSearchRepository;
    private final AuthorSearchRepository authorSearchRepository;
    private final AlbumSearchRepository albumSearchRepository;
    private final PlaylistSearchRepository playlistSearchRepository;

    public GlobalSearchResult searchAll(String query) {
        GlobalSearchResult result = new GlobalSearchResult();

        result.setTracks(searchTracks(query));
        result.setAuthors(searchAuthors(query));
        result.setAlbums(searchAlbums(query));
        result.setPlaylists(searchPlaylists(query));

        return result;
    }

    public List<TrackDocument> searchTracks(String query) {
        return trackSearchRepository.findBySearchTextContaining(query);
    }

    public List<TrackDocument> searchTracksByTitle(String title) {
        return trackSearchRepository.findByTitleContaining(title);
    }

    public List<TrackDocument> searchTracksByAuthor(String authorName) {
        return trackSearchRepository.findByAuthorNamesContaining(authorName);
    }

    public List<TrackDocument> searchTracksByAlbum(String albumTitle) {
        return trackSearchRepository.findByAlbumTitleContaining(albumTitle);
    }

    public List<TrackDocument> searchTracksByGenre(String genreName) {
        return trackSearchRepository.findByGenreNamesContaining(genreName);
    }

    // Поиск авторов
    public List<AuthorDocument> searchAuthors(String query) {
        return authorSearchRepository.findBySearchTextContaining(query);
    }

    public List<AuthorDocument> searchAuthorsByName(String name) {
        return authorSearchRepository.findByNameContaining(name);
    }

    // Поиск альбомов
    public List<AlbumDocument> searchAlbums(String query) {
        return albumSearchRepository.findBySearchTextContaining(query);
    }

    public List<AlbumDocument> searchAlbumsByTitle(String title) {
        return albumSearchRepository.findByTitleContaining(title);
    }

    public List<AlbumDocument> searchAlbumsByAuthor(String authorName) {
        return albumSearchRepository.findByAuthorNamesContaining(authorName);
    }

    // Поиск плейлистов
    public List<PlaylistDocument> searchPlaylists(String query) {
        return playlistSearchRepository.findBySearchTextContaining(query);
    }

    public List<PlaylistDocument> searchPublicPlaylists(String query) {
        return playlistSearchRepository.findByTitleContainingAndIsPublicTrue(query);
    }

    public List<PlaylistDocument> searchPlaylistsByOwner(String ownerName) {
        return playlistSearchRepository.findByOwnerName(ownerName);
    }
}
