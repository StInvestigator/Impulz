package com.example.server.service.elasticsearch;

import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.document.AlbumDocument;
import com.example.server.model.document.AuthorDocument;
import com.example.server.model.document.PlaylistDocument;
import com.example.server.model.document.TrackDocument;
import com.example.server.service.album.AlbumService;
import com.example.server.service.author.AuthorService;
import com.example.server.service.playlist.PlaylistService;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;


import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final TrackService trackService;
    private final AuthorService authorService;
    private final AlbumService albumService;
    private final PlaylistService playlistService;

//    public GlobalSearchResult searchAll(String query) {
//        log.info("Searching for: {}", query);
//
//        String normalized = normalizeQuery(query);
//        GlobalSearchResult result = new GlobalSearchResult();
//
//        result.setTracks(searchTracks(normalized));
//        result.setAuthors(searchAuthors(normalized));
//        result.setAlbums(searchAlbums(normalized));
//        result.setPlaylists(searchPublicPlaylists(normalized));
//
//        return result;
//    }

    public String normalizeQuery(String query) {
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


    public PageDto<TrackSimpleDto> searchTracks(String query, Pageable pageable) {
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
                )).withPageable(pageable)
                .build();

        SearchHits<TrackDocument> hits = elasticsearchOperations.search(searchQuery, TrackDocument.class);
        return new PageDto<>(trackService.getTracksByIds(hits.getSearchHits().stream().map(hit -> hit.getContent().getId()).toList()).stream().map(TrackSimpleDto::fromEntity).toList(),
                pageable.getPageNumber(),
                pageable.getPageSize(),
                (int)hits.getTotalHits() / pageable.getPageSize() + (hits.getTotalHits() % pageable.getPageSize() != 0 ? 1 : 0),
                hits.getTotalHits()
        );
    }

    public PageDto<AuthorSimpleDto> searchAuthors(String query, Pageable pageable) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("name^3", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                })).withPageable(pageable)
                .build();

        SearchHits<AuthorDocument> hits = elasticsearchOperations.search(searchQuery, AuthorDocument.class);
        return new PageDto<>(authorService.getAuthorsByIds(hits.getSearchHits().stream().map(hit -> hit.getContent().getId()).toList()).stream().map(AuthorSimpleDto::fromEntity).toList(),
                pageable.getPageNumber(),
                pageable.getPageSize(),
                (int)hits.getTotalHits() / pageable.getPageSize() + (hits.getTotalHits() % pageable.getPageSize() != 0 ? 1 : 0),
                hits.getTotalHits()
        );
    }

    public PageDto<AlbumSimpleDto> searchAlbums(String query, Pageable pageable) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("title^3", "authorNames^2", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                })).withPageable(pageable)
                .build();

        SearchHits<AlbumDocument> hits = elasticsearchOperations.search(searchQuery, AlbumDocument.class);
        return new PageDto<>(albumService.findAlbumsByIds(hits.getSearchHits().stream().map(hit -> hit.getContent().getId()).toList()).stream().map(AlbumSimpleDto::fromEntity).toList(),
                pageable.getPageNumber(),
                pageable.getPageSize(),
                (int)hits.getTotalHits() / pageable.getPageSize() + (hits.getTotalHits() % pageable.getPageSize() != 0 ? 1 : 0),
                hits.getTotalHits()
        );
    }

    public PageDto<PlaylistSimpleDto> searchPlaylists(String query, Pageable pageable) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.multiMatch(m -> {
                    m.query(query);
                    m.fields("title^3", "ownerName^2", "searchText");
                    m.type(multiMatchType(query));
                    if (useFuzziness(query)) m.fuzziness("AUTO");
                    return m;
                })).withPageable(pageable)
                .build();

        SearchHits<PlaylistDocument> hits = elasticsearchOperations.search(searchQuery, PlaylistDocument.class);
        return new PageDto<>(playlistService.findPlaylistsByIds(hits.getSearchHits().stream().map(hit -> hit.getContent().getId()).toList()).stream().map(PlaylistSimpleDto::fromEntity).toList(),
                pageable.getPageNumber(),
                pageable.getPageSize(),
                (int)hits.getTotalHits() / pageable.getPageSize() + (hits.getTotalHits() % pageable.getPageSize() != 0 ? 1 : 0),
                hits.getTotalHits()
        );
    }

    public PageDto<PlaylistDto> searchPublicPlaylists(String query, Pageable pageable) {
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
                )).withPageable(pageable)
                .build();

        SearchHits<PlaylistDocument> hits = elasticsearchOperations.search(searchQuery, PlaylistDocument.class);
        return new PageDto<>(playlistService.findPlaylistsByIds(hits.getSearchHits().stream().map(hit -> hit.getContent().getId()).toList()).stream().map(PlaylistDto::fromEntity).toList(),
                pageable.getPageNumber(),
                pageable.getPageSize(),
                (int)hits.getTotalHits() / pageable.getPageSize() + (hits.getTotalHits() % pageable.getPageSize() != 0 ? 1 : 0),
                hits.getTotalHits()
        );
    }
}
