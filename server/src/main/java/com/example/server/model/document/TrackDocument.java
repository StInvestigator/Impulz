package com.example.server.model.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(indexName = "tracks")
public class TrackDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String title;

    @Field(type = FieldType.Keyword)
    private List<String> authorNames = new ArrayList<>();

    @Field(type = FieldType.Keyword)
    private List<String> genreNames = new ArrayList<>();

    private Long albumId;
    @Field(type = FieldType.Text, analyzer = "standard")
    private String albumTitle;

    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime releaseDate;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String searchText;
}