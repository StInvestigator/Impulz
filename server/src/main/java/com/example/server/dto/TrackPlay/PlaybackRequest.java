package com.example.server.dto.TrackPlay;

import lombok.Data;

@Data
public class PlaybackRequest {
    private Long trackId;
    private Double currentTime;
    private Double duration;
    private String userId;
}