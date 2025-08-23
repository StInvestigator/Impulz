package com.example.server.dto.Track;

import lombok.Data;

import java.util.Set;

@Data
public class TrackSimpleDto
{
    private Long id;
    private String title;
    private Long durationSec;
    private String imgUrl;
    private Set<String> authors;
    private String album;
}