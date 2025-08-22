package com.example.server.service.music;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MusicService
{
    String uploadMusic(MultipartFile file, String fileName) throws IOException;
    String getStreamUrl(String fileName);
}
