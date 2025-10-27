package com.example.server.data.repository.elastic_search;

import com.example.server.model.document.AuthorDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface AuthorSearchRepository extends ElasticsearchRepository<AuthorDocument,String>
{
    List<AuthorDocument> findByNameContaining(String name);

    List<AuthorDocument> findBySearchTextContaining(String text);

    List<AuthorDocument> findByName(String name);
}
