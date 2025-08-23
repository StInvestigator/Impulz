package com.example.server.service.music;

import com.example.server.model.Track;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MusicService
{
    Track uploadMusic(MultipartFile file,Track track) throws IOException;
    String getStreamUrl(String fileUrl);
    boolean isMusicExists(String key);
    void deleteMusic(String fileName);
}
