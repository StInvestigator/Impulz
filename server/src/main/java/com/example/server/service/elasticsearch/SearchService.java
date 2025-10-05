package com.example.server.service.elasticsearch;

import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
import co.elastic.clients.json.JsonData;
import com.example.server.dto.Search.GlobalSearchResult;
import com.example.server.elasticsearch.document.*;
import com.example.server.elasticsearch.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        String normalized = normalizeQuery(query);
        GlobalSearchResult result = new GlobalSearchResult();

        result.setTracks(searchTracks(normalized));
        result.setAuthors(searchAuthors(normalized));
        result.setAlbums(searchAlbums(normalized));
        result.setPlaylists(searchPublicPlaylists(normalized));

        return result;
    }

    private String normalizeQuery(String query) {
        if (query == null) return "";
        return query
                .replaceAll("[\"'*?~!@#$%^&(){}\\[\\]:;<>|\\\\/]", " ")
                .replaceAll("\\s+", " ")
                .trim()
                .toLowerCase();
    }

    private boolean useFuzziness(String query) {
        return query.length() > 2;
    }

    private TextQueryType multiMatchType(String query) {
        return query.length() <= 2 ? TextQueryType.BoolPrefix : TextQueryType.BestFields;
    }


    public List<TrackDocument> searchTracks(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.bool(b -> b
                        .should(s -> s.prefix(p -> p
                                .field("title")
                                .value(query)
                                .boost(10.0f)
                        ))
                        .should(s -> s.matchPhrase(m -> m
                                .field("title")
                                .query(query)
                                .boost(query.length() > 2 ? 8.0f : 5.0f)
                        ))
                        .should(s -> s.multiMatch(m -> m
                                .query(query)
                                .fields("title^5", "authorNames^3", "albumTitle^2", "searchText")
                                .type(TextQueryType.BestFields)
                                .boost(1.0f)
                        ))
                ))
                .build();

        SearchHits<TrackDocument> hits = elasticsearchOperations.search(searchQuery, TrackDocument.class);
        return hits.getSearchHits().stream().map(hit -> hit.getContent()).toList();
    }

    public List<AuthorDocument> searchAuthors(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("name^3", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                }))
                .build();

        SearchHits<AuthorDocument> hits = elasticsearchOperations.search(searchQuery, AuthorDocument.class);
        return hits.getSearchHits().stream().map(hit -> hit.getContent()).toList();
    }

    public List<AlbumDocument> searchAlbums(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("title^3", "authorNames^2", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                }))
                .build();

        SearchHits<AlbumDocument> hits = elasticsearchOperations.search(searchQuery, AlbumDocument.class);
        return hits.getSearchHits().stream().map(hit -> hit.getContent()).toList();
    }

    public List<PlaylistDocument> searchPlaylists(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("title^3", "ownerName^2", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                }))
                .build();

        SearchHits<PlaylistDocument> hits = elasticsearchOperations.search(searchQuery, PlaylistDocument.class);
        return hits.getSearchHits().stream().map(hit -> hit.getContent()).toList();
    }

    public List<PlaylistDocument> searchPublicPlaylists(String query) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.bool(b -> b
                        .must(m -> m.multiMatch(mm -> {
                            mm.query(query);
                            mm.fields("title^3", "ownerName^2", "searchText");
                            mm.type(multiMatchType(query));
                            if (useFuzziness(query)) mm.fuzziness("AUTO");
                            return mm;
                        }))
                        .filter(f -> f.term(t -> t.field("isPublic").value(true)))
                ))
                .build();

        SearchHits<PlaylistDocument> hits = elasticsearchOperations.search(searchQuery, PlaylistDocument.class);
        return hits.getSearchHits().stream().map(hit -> hit.getContent()).toList();
    }
}
