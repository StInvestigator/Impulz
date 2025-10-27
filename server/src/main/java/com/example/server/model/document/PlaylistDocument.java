package com.example.server.model.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Document(indexName = "playlists")
public class PlaylistDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String title;

    private Boolean isPublic;

    @Field(type = FieldType.Keyword)
    private String ownerName;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String searchText;
}