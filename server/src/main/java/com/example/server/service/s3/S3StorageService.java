package com.example.server.service.s3;

import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;

public interface S3StorageService
{
    void uploadFile(MultipartFile file, String key, String contentType);
    String generatePresignedUrl(String key, Duration duration);
    void deleteFile(String key);
    boolean fileExists(String key);
}
