package com.example.server.data.repository;

import com.example.server.model.id.UserFavoriteTrack;
import com.example.server.model.key.UserFavoriteTrackKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserFavoriteTrackRepository extends JpaRepository<UserFavoriteTrack, UserFavoriteTrackKey> {
    @Query(value = """ 
            SELECT track_id
            FROM user_favorite_tracks
            WHERE user_id = :userId AND track_id IN :trackIds""",
            nativeQuery = true)
    List<Long> findTrackIdsByUserAndTrackIds(@Param("userId") String userId, @Param("trackIds") List<Long> trackIds);
}
