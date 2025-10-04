package com.example.server.elasticsearch.repository;

import com.example.server.elasticsearch.document.AlbumDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface AlbumSearchRepository extends ElasticsearchRepository<AlbumDocument,Long>
{
    List<AlbumDocument> findByTitleContaining(String title);

    List<AlbumDocument> findByAuthorNamesContaining(String authorName);

    List<AlbumDocument> findBySearchTextContaining(String text);

    List<AlbumDocument> findByTitleContainingOrAuthorNamesContaining(String title, String authorName);

    List<AlbumDocument> findByAuthorNames(String authorName);
}
