package com.example.server.data.repository;

import com.example.server.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album,Long>
{
    Album getAlbumById(Long id);

    @Query(value = """
    SELECT a.* FROM albums a
    LEFT JOIN tracks t ON t.album_id = a.id
    LEFT JOIN track_plays tp ON tp.track_id = t.id
    WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY a.id
    ORDER BY COUNT(tp.id) DESC
    LIMIT 10
    """, nativeQuery = true)
    List<Album> findRecommendedAlbumsToday();
}
