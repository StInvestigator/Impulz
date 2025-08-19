package com.example.server.controller;

import com.example.server.service.MusicService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/music")
public class MusicController
{
    private final MusicService musicService;

    public MusicController(MusicService musicService){
        this.musicService = musicService;
    }

    @PostMapping("/upload")
    public String upload(@RequestParam("file")MultipartFile file,@RequestParam String fileName){
        return musicService.uploadMusic(file,fileName);
    }

    @GetMapping("/stream/{fileName}")
    public String getStreamUrl(@PathVariable String fileName){
        return musicService.getMusicUrl(fileName);
    }
}
