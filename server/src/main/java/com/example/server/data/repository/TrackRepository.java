package com.example.server.data.repository;

import com.example.server.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {

    Track getTrackById(Long id);
    Track getTrackByTitle(String title);
    Track findTrackByFileUrl(String fileUrl);
}