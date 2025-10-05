package com.example.server.elasticsearch.repository;

import com.example.server.elasticsearch.document.AuthorDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface AuthorSearchRepository extends ElasticsearchRepository<AuthorDocument,String>
{
    List<AuthorDocument> findByNameContaining(String name);

    List<AuthorDocument> findByBioContaining(String bio);

    List<AuthorDocument> findBySearchTextContaining(String text);

    List<AuthorDocument> findByNameContainingOrBioContaining(String name, String bio);

    List<AuthorDocument> findByName(String name);
}
