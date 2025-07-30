package com.example.server.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Album {
    private Long id;
    private String name;
    private User author;
    private List<Track> tracks = new ArrayList<>();
}
