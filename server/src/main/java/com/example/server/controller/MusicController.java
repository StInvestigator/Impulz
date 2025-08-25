package com.example.server.controller;

import com.example.server.factory.track.TrackFactory;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController
{
    private final MusicServiceImpl musicServiceImpl;
    private final TrackFactory trackFactory;

    public MusicController(MusicServiceImpl musicServiceImpl, TrackFactory trackFactory){
        this.musicServiceImpl = musicServiceImpl;
        this.trackFactory = trackFactory;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file")MultipartFile file,
            @RequestParam String title,
            @RequestParam Long albumId,
            @RequestParam List<String> authorIds,
            @RequestParam List<Long> genreIds
            ) throws IOException {
        try {
            Track track = trackFactory.createTrack(title,albumId,authorIds,genreIds);

            Track savedTrack = musicServiceImpl.uploadMusic(file,track);
            return ResponseEntity.ok("Track successfully saved with ID: " + savedTrack.getId());
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body("Error uploading track: " + e.getMessage());
        }
    }

    @GetMapping("/stream/{fileName}")
    public ResponseEntity<String> getStreamUrl(@PathVariable String fileName){
        try {
            String key = "music/" + fileName;
            String url = musicServiceImpl.getStreamUrl(key);
            return ResponseEntity.ok(url);
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body("Error generating file URL: " + e.getMessage());
        }
    }
}
