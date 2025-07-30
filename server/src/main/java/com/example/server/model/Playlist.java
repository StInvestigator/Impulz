package com.example.server.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Playlist {
    private Long id;
    private String name;
    private String description;
    private List<Track> tracks = new ArrayList<>();
}
