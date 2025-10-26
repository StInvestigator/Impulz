package com.example.server.data.repository;

import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.key.UserFavoriteAlbumKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserFavouriteAlbumRepository extends JpaRepository<UserFavoriteAlbum, UserFavoriteAlbumKey>
{
    @Query(value = """ 
            SELECT album_id
            FROM user_favorite_albums
            WHERE user_id = :userId AND album_id IN :albumIds""",
            nativeQuery = true)
    List<Long> findAlbumsIdsByUserAndAlbumIds(@Param("userId") String userId, @Param("albumIds") List<Long> albumIds);
}
