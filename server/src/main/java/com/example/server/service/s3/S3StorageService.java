package com.example.server.service.s3;

import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import java.io.File;
import java.io.InputStream;
import java.time.Duration;

public interface S3StorageService
{
    void uploadFile(File file, String key, String contentType);
    String generatePresignedUrl(String key, Duration duration);
    void deleteFile(String key);
    boolean fileExists(String key);
    HeadObjectResponse getHeadObjectResponse(String key);
    InputStream getInputStream(String key, String range);
}
