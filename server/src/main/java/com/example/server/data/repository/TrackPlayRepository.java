package com.example.server.data.repository;

import com.example.server.model.TrackPlay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrackPlayRepository extends JpaRepository<TrackPlay, Long> {
    boolean existsBySessionId(String sessionId);

    @Query(value = "SELECT COUNT(*) FROM track_plays WHERE track_id = :trackId AND played_at >= NOW() - INTERVAL '7 days'", nativeQuery = true)
    long countWeeklyPlaysByTrackIdNative(@Param("trackId") Long trackId);
}