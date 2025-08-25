package com.example.server.dto.User;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDto
{
    private String id;
    private String username;
    private String email;
    private String imgUrl;
    private Set<AlbumSimpleDto> favouriteAlbums;
    private Set<PlaylistSimpleDto> favouritePlaylists;
    private AuthorDto authorDto = null;

    public static UserDto fromEntity(User user){
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setImgUrl(user.getAvatarUrl());
        if (user.getAuthorProfile() != null){
            dto.setAuthorDto(AuthorDto.fromEntity(user.getAuthorProfile()));
        } else{ dto.setAuthorDto(null); }
        dto.setFavouriteAlbums(user.getFavoriteAlbums().stream()
                .map(userFavoriteAlbum -> AlbumSimpleDto.fromEntity(userFavoriteAlbum.getAlbum()))
                .collect(Collectors.toSet()));
        dto.setFavouritePlaylists(user.getFavoritePlaylists().stream()
                .map(userFavoritePlaylist -> PlaylistSimpleDto.fromEntity(userFavoritePlaylist.getPlaylist()))
                .collect(Collectors.toSet()));
        return dto;
    }
}
