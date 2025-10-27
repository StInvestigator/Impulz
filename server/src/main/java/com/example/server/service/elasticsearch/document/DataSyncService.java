package com.example.server.service.elasticsearch.document;

import com.example.server.data.repository.*;
import com.example.server.data.repository.elastic_search.AlbumSearchRepository;
import com.example.server.data.repository.elastic_search.AuthorSearchRepository;
import com.example.server.data.repository.elastic_search.PlaylistSearchRepository;
import com.example.server.data.repository.elastic_search.TrackSearchRepository;
import com.example.server.model.document.AlbumDocument;
import com.example.server.model.document.AuthorDocument;
import com.example.server.model.document.PlaylistDocument;
import com.example.server.model.document.TrackDocument;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataSyncService
{
    private final TrackRepository trackRepository;
    private final AuthorRepository authorRepository;
    private final AlbumRepository albumRepository;
    private final PlaylistRepository playlistRepository;

    private final TrackSearchRepository trackSearchRepository;
    private final AuthorSearchRepository authorSearchRepository;
    private final AlbumSearchRepository albumSearchRepository;
    private final PlaylistSearchRepository playlistSearchRepository;

    private final DocumentConversionService conversionService;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional(readOnly = true)
    public void initialSync() {
        log.info("Starting initial Elasticsearch sync...");

        try {
            syncAllTracks();
            syncAllAuthors();
            syncAllAlbums();
            syncAllPlaylists();
            log.info("Elasticsearch sync completed successfully");
        } catch (Exception e) {
            log.error("Initial Elasticsearch sync failed", e);
        }
    }

    private <T> List<List<T>> partitionList(List<T> list, int batchSize) {
        List<List<T>> batches = new ArrayList<>();
        for (int i = 0; i < list.size(); i += batchSize) {
            batches.add(list.subList(i, Math.min(i + batchSize, list.size())));
        }
        return batches;
    }

    public void syncAllTracks() {
        try {
            List<Track> tracks = trackRepository.findAllWithAuthorsAndAlbum();

            List<List<Track>> batches = partitionList(tracks, 100);

            for (List<Track> batch : batches) {
                List<TrackDocument> documents = batch.stream()
                        .map(conversionService::convertToDocument)
                        .toList();

                trackSearchRepository.saveAll(documents);
                log.debug("Synced batch of {} tracks", batch.size());
            }

            log.info("Synced {} tracks to Elasticsearch", tracks.size());
        } catch (Exception e) {
            log.error("Error syncing tracks to Elasticsearch", e);
        }
    }

    public void syncTrack(Track track) {
        try {
            TrackDocument document = conversionService.convertToDocument(track);
            trackSearchRepository.save(document);
            log.debug("Synced track {} to Elasticsearch", track.getId());
        } catch (Exception e) {
            log.error("Error syncing track {} to Elasticsearch", track.getId(), e);
        }
    }

    public void syncAllAuthors() {
        try {
            List<Author> authors = authorRepository.findAllWithUser();

            List<List<Author>> batches = partitionList(authors, 100);

            for (List<Author> batch : batches) {
                List<AuthorDocument> documents = batch.stream()
                        .map(conversionService::convertToDocument)
                        .toList();

                authorSearchRepository.saveAll(documents);
                log.debug("Synced batch of {} authors", batch.size());
            }

            log.info("Synced {} authors to Elasticsearch", authors.size());
        } catch (Exception e) {
            log.error("Error syncing authors to Elasticsearch", e);
        }
    }

    public void syncAuthor(Author author) {
        try {
            AuthorDocument document = conversionService.convertToDocument(author);
            authorSearchRepository.save(document);
            log.debug("Synced author {} to Elasticsearch", author.getId());
        } catch (Exception e) {
            log.error("Error syncing author {} to Elasticsearch", author.getId(), e);
        }
    }

    public void syncAllAlbums() {
        try {
            List<Album> albums = albumRepository.findAllWithAuthors();

            List<List<Album>> batches = partitionList(albums, 100);

            for (List<Album> batch : batches) {
                List<AlbumDocument> documents = batch.stream()
                        .map(conversionService::convertToDocument)
                        .toList();

                albumSearchRepository.saveAll(documents);
                log.debug("Synced batch of {} albums", batch.size());
            }

            log.info("Synced {} albums to Elasticsearch", albums.size());
        } catch (Exception e) {
            log.error("Error syncing albums to Elasticsearch", e);
        }
    }

    public void syncAlbum(Album album) {
        try {
            AlbumDocument document = conversionService.convertToDocument(album);
            albumSearchRepository.save(document);
            log.debug("Synced album {} to Elasticsearch", album.getId());
        } catch (Exception e) {
            log.error("Error syncing album {} to Elasticsearch", album.getId(), e);
        }
    }

    public void syncAllPlaylists() {
        try {
            List<Playlist> playlists = playlistRepository.findAllWithOwner();

            List<List<Playlist>> batches = partitionList(playlists, 100);

            for (List<Playlist> batch : batches) {
                List<PlaylistDocument> documents = batch.stream()
                        .map(conversionService::convertToDocument)
                        .toList();

                playlistSearchRepository.saveAll(documents);
                log.debug("Synced batch of {} playlists", batch.size());
            }

            log.info("Synced {} playlists to Elasticsearch", playlists.size());
        } catch (Exception e) {
            log.error("Error syncing playlists to Elasticsearch", e);
        }
    }

    public void syncPlaylist(Playlist playlist) {
        try {
            PlaylistDocument document = conversionService.convertToDocument(playlist);
            playlistSearchRepository.save(document);
            log.debug("Synced playlist {} to Elasticsearch", playlist.getId());
        } catch (Exception e) {
            log.error("Error syncing playlist {} to Elasticsearch", playlist.getId(), e);
        }
    }

    public void deleteTrack(Long trackId) {
        trackSearchRepository.deleteById(trackId);
    }

    public void deleteAuthor(String authorId) {
        authorSearchRepository.deleteById(authorId);
    }

    public void deleteAlbum(Long albumId) {
        albumSearchRepository.deleteById(albumId);
    }

    public void deletePlaylist(Long playlistId) {
        playlistSearchRepository.deleteById(playlistId);
    }
}
