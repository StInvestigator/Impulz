package com.example.server.data.repository;

import com.example.server.model.id.UserFavoritePlaylist;
import com.example.server.model.id.UserFavoriteTrack;
import com.example.server.model.key.UserFavoritePlaylistKey;
import com.example.server.model.key.UserFavoriteTrackKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserFavoritePlaylistRepository extends JpaRepository<UserFavoritePlaylist, UserFavoritePlaylistKey> {
}
