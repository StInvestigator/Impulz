package com.example.server.dto.Playlist;

import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Playlist;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class PlaylistSimpleDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private OffsetDateTime createdAt;
    private UserSimpleDto owner;
    private Integer tracksCount;

    public static PlaylistSimpleDto fromEntity(Playlist playlist){
        PlaylistSimpleDto dto = new PlaylistSimpleDto();
        dto.setId(playlist.getId());
        dto.setTitle(playlist.getTitle());
        dto.setImgUrl(playlist.getImageUrl());
        dto.setCreatedAt(playlist.getCreatedAt());
        dto.setOwner(UserSimpleDto.fromEntity(playlist.getOwner()));
        dto.setTracksCount(playlist.getTracks().size());
        return dto;
    }
}
