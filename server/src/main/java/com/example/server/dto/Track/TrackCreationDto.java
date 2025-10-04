package com.example.server.dto.Track;

import lombok.Data;

import java.util.Set;

@Data
public class TrackCreationDto {
    private String title;
    private Set<String> authorIds;
    private Set<Long> genreIds;
    private String clientFileName;
    private String clientCoverName;
}
