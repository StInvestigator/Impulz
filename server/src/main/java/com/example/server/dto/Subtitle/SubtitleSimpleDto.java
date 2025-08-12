package com.example.server.dto.Subtitle;

import lombok.Data;

@Data
public class SubtitleSimpleDto
{
    private Long id;
    private Integer startTimeMs;
    private Integer endTimeMs;
    private String text;
}
