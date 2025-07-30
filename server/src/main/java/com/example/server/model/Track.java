package com.example.server.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Track {
    private Long id;
    private String name;
    private String author;
    private String audio;
    private String subtitles;
    private int likes;
    private String picture;
    private List<Genre> genres = new ArrayList<>();
}
