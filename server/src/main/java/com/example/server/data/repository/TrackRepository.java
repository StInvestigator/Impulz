package com.example.server.data.repository;

import com.example.server.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    Track getTrackById(Long id);
    Track getTrackByTitle(String title);
    Track findTrackByFileUrl(String fileUrl);

    @Query(value = """
        SELECT t.*, COUNT(tp.id) as play_count
        FROM tracks t
        JOIN track_plays tp ON t.id = tp.track_id
        WHERE tp.played_at >= NOW() - INTERVAL '7 days'
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC
        LIMIT 20
        """, nativeQuery = true)
    List<Track> findTop20MostPlayedTracksThisWeek();

    @Modifying
    @Query("UPDATE Track t SET t.totalPlays = t.totalPlays + 1 WHERE t.id = :trackId")
    void incrementTotalPlays(@Param("trackId") Long trackId);
}