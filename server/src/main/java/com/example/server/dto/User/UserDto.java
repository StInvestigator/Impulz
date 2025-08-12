package com.example.server.dto.User;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import lombok.Data;

import java.util.Set;

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
}
