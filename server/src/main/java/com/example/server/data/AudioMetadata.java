package com.example.server.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AudioMetadata {
    private Long durationSec;
    private Long fileSize;
    private String contentType;
}
