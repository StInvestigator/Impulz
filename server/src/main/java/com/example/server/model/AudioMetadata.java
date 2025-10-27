package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AudioMetadata {
    private Long durationSec;
    private Long fileSize;
    private String contentType;
    private String tempFilePath;
}
