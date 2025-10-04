package com.example.server.service.music;

import com.example.server.model.Track;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import java.io.IOException;
import java.io.InputStream;

public interface MusicService
{
    Track uploadMusic(MultipartFile file,Track track);
    boolean isMusicExists(String key);
    void deleteMusic(String fileName);
    HeadObjectResponse getHeadObjectResponse(String key);
    InputStream getInputStream(String key, String range);
}