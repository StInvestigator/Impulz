package com.example.server.dto.Author;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Author;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class AuthorDto
{
    private String id;
    private String bio;
    private Long followersCount;
    // TODO
    // private Long subscriptions;
    private Set<TrackSimpleDto> tracks;
    private Set<AlbumSimpleDto> albums;

    public static AuthorDto fromEntity(Author author){
        AuthorDto dto = new AuthorDto();
        dto.setId(author.getId());
        dto.setBio(author.getBio());
        dto.setFollowersCount(author.getFollowersCount());
        // dto.setSubscriptions() ???
        dto.setAlbums(author.getAlbums().stream()
                .map(AlbumSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        dto.setTracks(author.getTracks().stream()
                .map(TrackSimpleDto::fromEntity)
                .collect(Collectors.toSet()));
        return dto;
    }
}
