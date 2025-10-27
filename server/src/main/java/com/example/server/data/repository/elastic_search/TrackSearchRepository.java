package com.example.server.data.repository.elastic_search;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import com.example.server.model.document.TrackDocument;

import java.util.List;

public interface TrackSearchRepository extends ElasticsearchRepository<TrackDocument,Long>
{
    List<TrackDocument> findByTitleContaining(String title);

    List<TrackDocument> findByAuthorNamesContaining(String authorName);

    List<TrackDocument> findByAlbumTitleContaining(String albumTitle);

    List<TrackDocument> findByGenreNamesContaining(String genreName);

    List<TrackDocument> findBySearchTextContaining(String text);

    Page<TrackDocument> findBySearchTextContaining(String text, Pageable pageable);

    List<TrackDocument> findByTitleContainingOrAuthorNamesContainingOrAlbumTitleContaining(
            String title, String authorName, String albumTitle);

    @Query("""
    {
        "multi_match": {
            "query": "?0",
            "fields": ["title", "author_names", "album_title", "genre_names", "search_text"]
        }
    }
    """)
    List<TrackDocument> searchTracks(String query);
}
