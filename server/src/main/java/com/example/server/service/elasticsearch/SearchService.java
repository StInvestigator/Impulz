package com.example.server.service.elasticsearch;

import com.example.server.dto.Search.GlobalSearchResult;
import com.example.server.elasticsearch.document.*;
import com.example.server.elasticsearch.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {

    private final TrackSearchRepository trackSearchRepository;
    private final AuthorSearchRepository authorSearchRepository;
    private final AlbumSearchRepository albumSearchRepository;
    private final PlaylistSearchRepository playlistSearchRepository;
    private final ElasticsearchOperations elasticsearchOperations;

    public GlobalSearchResult searchAll(String query) {
        log.info("Searching for: {}", query);

        try {
            String normalized = normalizeQuery(query);
            GlobalSearchResult result = new GlobalSearchResult();

            log.info("Searching tracks...");
            List<TrackDocument> tracks = searchTracks(normalized);
            log.info("Found {} tracks", tracks.size());
            result.setTracks(tracks);

            log.info("Searching authors...");
            List<AuthorDocument> authors = searchAuthors(normalized);
            log.info("Found {} authors", authors.size());
            result.setAuthors(authors);

            log.info("Searching albums...");
            List<AlbumDocument> albums = searchAlbums(normalized);
            log.info("Found {} albums", albums.size());
            result.setAlbums(albums);

            log.info("Searching playlists...");
            List<PlaylistDocument> playlists = searchPlaylists(normalized);
            log.info("Found {} playlists", playlists.size());
            result.setPlaylists(playlists);

            return result;
        } catch (Exception e) {
            log.error("Error during search: ", e);
            throw e;
        }
    }

    private String normalizeQuery(String query) {
        if (query == null) return "";
        return query
                .replaceAll("[\"'*?~!@#$%^&(){}\\[\\]:;<>|\\\\/]", " ") // убираем спецсимволы
                .replaceAll("\\s+", " ") // убираем двойные пробелы
                .trim()
                .toLowerCase();
    }

    public List<TrackDocument> searchTracks(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> m
                        .query(query)
                        .fields("title", "author_names", "album_title", "genre_names", "search_text")
                        .fuzziness("AUTO")
                ))
                .build();

        SearchHits<TrackDocument> hits = elasticsearchOperations.search(searchQuery, TrackDocument.class);
        return hits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

    public List<AuthorDocument> searchAuthors(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> m
                        .query(query)
                        .fields("name", "search_text")
                        .fuzziness("AUTO")
                ))
                .build();

        SearchHits<AuthorDocument> hits = elasticsearchOperations.search(searchQuery, AuthorDocument.class);
        return hits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

    public List<AlbumDocument> searchAlbums(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> m
                        .query(query)
                        .fields("title", "author_names", "search_text")
                        .fuzziness("AUTO")
                ))
                .build();

        SearchHits<AlbumDocument> hits = elasticsearchOperations.search(searchQuery, AlbumDocument.class);
        return hits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

    public List<PlaylistDocument> searchPlaylists(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> m
                        .query(query)
                        .fields("title", "owner_name", "search_text")
                        .fuzziness("AUTO")
                ))
                .build();

        SearchHits<PlaylistDocument> hits = elasticsearchOperations.search(searchQuery, PlaylistDocument.class);
        return hits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

    public List<PlaylistDocument> searchPublicPlaylists(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q
                        .bool(b -> b
                                .must(m -> m.multiMatch(mm -> mm
                                        .query(query)
                                        .fields("title", "owner_name", "search_text")
                                        .fuzziness("AUTO")
                                ))
                                .filter(f -> f.term(t -> t
                                        .field("is_public")
                                        .value(true)
                                ))
                        )
                )
                .build();

        SearchHits<PlaylistDocument> hits =
                elasticsearchOperations.search(searchQuery, PlaylistDocument.class);

        return hits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

}