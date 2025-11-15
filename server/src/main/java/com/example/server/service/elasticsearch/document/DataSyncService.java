package com.example.server.service.elasticsearch.document;

import co.elastic.clients.elasticsearch._types.Conflicts;
import com.example.server.data.repository.*;
import com.example.server.data.repository.elastic_search.AlbumSearchRepository;
import com.example.server.data.repository.elastic_search.AuthorSearchRepository;
import com.example.server.data.repository.elastic_search.PlaylistSearchRepository;
import com.example.server.data.repository.elastic_search.TrackSearchRepository;
import com.example.server.model.*;
import com.example.server.model.document.AlbumDocument;
import com.example.server.model.document.AuthorDocument;
import com.example.server.model.document.PlaylistDocument;
import com.example.server.model.document.TrackDocument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.UpdateByQueryRequest;
import co.elastic.clients.elasticsearch.core.UpdateByQueryResponse;
import co.elastic.clients.json.JsonData;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataSyncService {
    private final TrackRepository trackRepository;
    private final AuthorRepository authorRepository;
    private final AlbumRepository albumRepository;
    private final PlaylistRepository playlistRepository;

    private final TrackSearchRepository trackSearchRepository;
    private final AuthorSearchRepository authorSearchRepository;
    private final AlbumSearchRepository albumSearchRepository;
    private final PlaylistSearchRepository playlistSearchRepository;

    private final DocumentConversionService conversionService;
    private final ElasticsearchClient elasticsearchClient;

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

    public void syncTracks(Collection<Track> tracks) {
        try {
            List<TrackDocument> documents = tracks.stream().map(conversionService::convertToDocument).toList();
            trackSearchRepository.saveAll(documents);
            log.debug("Synced tracks amount {} to Elasticsearch", tracks.size());
        } catch (Exception e) {
            log.error("Error syncing tracks amount {} to Elasticsearch", tracks.size(), e);
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

    public void syncAuthor(User user) {
        Author author = new Author();
        author.setId(user.getId());
        author.setUser(user);
        syncAuthor(author);
    }

    public void syncAuthorNewUsername(User user, String oldUsername) throws Exception {
        Author author = new Author();
        author.setId(user.getId());
        author.setUser(user);
        syncAuthor(author);

        updateTracksAuthorName(oldUsername, author.getUser().getUsername());

        updateAlbumsAuthorName(oldUsername, author.getUser().getUsername());

        updatePlaylistsOwnerName(oldUsername, author.getUser().getUsername());
    }

    private void updateTracksAuthorName(String oldUsername, String newUsername) throws Exception {
        String script = """
                    if (ctx._source.containsKey('authorNames')) {
                      for (int i = 0; i < ctx._source.authorNames.size(); i++) {
                        if (ctx._source.authorNames.get(i).equals(params.old)) {
                          ctx._source.authorNames.set(i, params.new);
                        }
                      }
                    }
                """;

        UpdateByQueryRequest request = UpdateByQueryRequest.of(b -> b
                .index("tracks")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("authorNames").value(oldUsername)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldUsername))
                        .params("new", JsonData.of(newUsername))
                ))
                .refresh(true)
        );

        elasticsearchClient.updateByQuery(request);

        rebuildTracksSearchText(oldUsername, newUsername);
    }

    private void rebuildTracksSearchText(String oldAuthorName, String newAuthorName) throws Exception {
        String script = """
                    StringBuilder sb = new StringBuilder();
                    if (ctx._source.title != null) { sb.append(ctx._source.title).append(' '); }
                    if (ctx._source.authorNames != null) {
                      for (int i = 0; i < ctx._source.authorNames.size(); i++) {
                        if (ctx._source.authorNames.get(i) != null) {
                          sb.append(ctx._source.authorNames.get(i)).append(' ');
                        }
                      }
                      sb.append(params.old).append(' ');
                    }
                    if (ctx._source.albumTitle != null) { sb.append(ctx._source.albumTitle).append(' '); }
                    if (ctx._source.genres != null) {
                      for (int i = 0; i < ctx._source.genres.size(); i++) {
                        if (ctx._source.genres.get(i) != null) {
                          sb.append(ctx._source.genres.get(i)).append(' ');
                        }
                      }
                    }
                    ctx._source.searchText = sb.toString().trim();
                """;

        UpdateByQueryRequest req = UpdateByQueryRequest.of(b -> b
                .index("tracks")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("authorNames").value(newAuthorName)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldAuthorName))
                ))
                .refresh(true)
        );

        log.info("Search text updated for tracks count - {}", elasticsearchClient.updateByQuery(req).updated());
    }

    private void updateAlbumsAuthorName(String oldUsername, String newUsername) throws Exception {
        String script = """
                    if (ctx._source.containsKey('authorNames')) {
                      for (int i = 0; i < ctx._source.authorNames.size(); i++) {
                        if (ctx._source.authorNames.get(i).equals(params.old)) {
                          ctx._source.authorNames.set(i, params.new);
                        }
                      }
                    }
                """;

        UpdateByQueryRequest request = UpdateByQueryRequest.of(b -> b
                .index("albums")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("authorNames").value(oldUsername)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldUsername))
                        .params("new", JsonData.of(newUsername))
                ))
                .refresh(true)
        );

        elasticsearchClient.updateByQuery(request);

        rebuildAlbumsSearchText(oldUsername, newUsername);
    }

    private void rebuildAlbumsSearchText(String oldAuthorName, String newAuthorName) throws Exception {
        String script = """
                    StringBuilder sb = new StringBuilder();
                    if (ctx._source.title != null) { sb.append(ctx._source.title).append(' '); }
                    if (ctx._source.authorNames != null) {
                      for (int i = 0; i < ctx._source.authorNames.size(); i++) {
                        if (ctx._source.authorNames.get(i) != null) {
                          sb.append(ctx._source.authorNames.get(i)).append(' ');
                        }
                      }
                      sb.append(params.old).append(' ');
                    }
                    ctx._source.searchText = sb.toString().trim();
                """;

        UpdateByQueryRequest req = UpdateByQueryRequest.of(b -> b
                .index("albums")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("authorNames").value(newAuthorName)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldAuthorName))))
                .refresh(true)
        );

        elasticsearchClient.updateByQuery(req);
        log.info("Search text updated for albums count - {}", elasticsearchClient.updateByQuery(req).updated());

    }

    private void updatePlaylistsOwnerName(String oldUsername, String newUsername) throws Exception {
        String script = """
                    if (ctx._source.containsKey('ownerName') && ctx._source.ownerName.equals(params.old)) {
                        ctx._source.ownerName = params.new;
                    }
                """;

        UpdateByQueryRequest request = UpdateByQueryRequest.of(b -> b
                .index("playlists")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("ownerName").value(oldUsername)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldUsername))
                        .params("new", JsonData.of(newUsername))
                ))
                .refresh(true)
        );

        elasticsearchClient.updateByQuery(request);

        rebuildPlaylistsSearchText(oldUsername, newUsername);
    }

    private void rebuildPlaylistsSearchText(String oldOwnerName, String newOwnerName) throws Exception {
        String script = """
                    StringBuilder sb = new StringBuilder();
                    if (ctx._source.title != null) { sb.append(ctx._source.title).append(' '); }
                    if (ctx._source.ownerName != null) {
                      sb.append(ctx._source.ownerName).append(' ');
                      sb.append(params.old).append(' ');
                    }
                    ctx._source.searchText = sb.toString().trim();
                """;

        UpdateByQueryRequest req = UpdateByQueryRequest.of(b -> b
                .index("playlists")
                .conflicts(Conflicts.Proceed)
                .query(q -> q.term(t -> t.field("ownerName").value(newOwnerName)))
                .script(s -> s.inline(i -> i
                        .lang("painless")
                        .source(script)
                        .params("old", JsonData.of(oldOwnerName))
                ))
                .refresh(true)
        );

        elasticsearchClient.updateByQuery(req);
        log.info("Search text updated for playlists count - {}", elasticsearchClient.updateByQuery(req).updated());
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

    public void deleteTracks(Iterable<Long> trackIds) {
        trackSearchRepository.deleteAllById(trackIds);
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
