package com.example.server.controller;

import com.example.server.service.music.MusicServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/music")
public class MusicController
{
    private final MusicServiceImpl musicServiceImpl;

    public MusicController(MusicServiceImpl musicServiceImpl){
        this.musicServiceImpl = musicServiceImpl;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file")MultipartFile file,
            @RequestParam String fileName
    ) throws IOException {
        String result = musicServiceImpl.uploadMusic(file, fileName);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/stream/{fileName}")
    public ResponseEntity<String> getStreamUrl(@PathVariable String fileName){
        try {
            String url = musicServiceImpl.getStreamUrl(fileName);
            return ResponseEntity.ok(url);
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body("Error generating file URL: " + e.getMessage());
        }
    }
}
