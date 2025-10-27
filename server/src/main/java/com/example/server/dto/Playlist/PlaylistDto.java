package com.example.server.dto.Playlist;

import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.model.id.PlaylistTrack;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class PlaylistDto
{
    private Long id;
    private String title;
    private String imgUrl;
    private Boolean isPublic;
    private UserSimpleDto owner;
    private OffsetDateTime createdAt;
    private Set<TrackSimpleDto> tracks;

    public static PlaylistDto fromEntity(Playlist playlist){
        PlaylistDto dto = new PlaylistDto();
        dto.setId(playlist.getId());
        dto.setTitle(playlist.getTitle());
        dto.setCreatedAt(playlist.getCreatedAt());
        dto.setImgUrl(playlist.getImageUrl());
        dto.setIsPublic(playlist.getIsPublic());
        dto.setOwner(UserSimpleDto.fromEntity(playlist.getOwner()));
        dto.setTracks(playlist.getTracks().stream()
                        .sorted(Comparator.comparingInt(PlaylistTrack::getPosition))
                .map(playlistTrack -> TrackSimpleDto.fromEntity(playlistTrack.getTrack()))
                .collect(Collectors.toSet()));
        return dto;
    }
}
