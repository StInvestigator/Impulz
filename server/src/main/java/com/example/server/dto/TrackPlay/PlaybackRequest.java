package com.example.server.dto.TrackPlay;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlaybackRequest {
    @NotNull
    private Long trackId;

    @NotNull
    private Double currentTime;

    @NotNull
    private Double duration;

    private String userId;

    @NotNull
    private String sessionId;
}