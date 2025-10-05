package com.example.server.elasticsearch.repository;

import com.example.server.elasticsearch.document.PlaylistDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PlaylistSearchRepository extends ElasticsearchRepository<PlaylistDocument,Long>
{
    List<PlaylistDocument> findByTitleContaining(String title);

    List<PlaylistDocument> findByOwnerNameContaining(String ownerName);

    List<PlaylistDocument> findBySearchTextContaining(String text);

    List<PlaylistDocument> findByIsPublicTrue();

    List<PlaylistDocument> findByTitleContainingAndIsPublicTrue(String title);

    List<PlaylistDocument> findByOwnerName(String ownerName);

    List<PlaylistDocument> findByTitleContainingOrOwnerNameContaining(String title, String ownerName);
}
