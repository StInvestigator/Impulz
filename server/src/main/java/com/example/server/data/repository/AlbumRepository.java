package com.example.server.data.repository;

import com.example.server.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album,Long>
{
    Album getAlbumById(Long id);
}
