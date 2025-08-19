package com.example.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.time.Duration;

@Service
public class MusicService {
    private final S3Client s3Client;
    private final S3Presigner presigner;
    private final String bucketName;

    public MusicService(
            S3Client s3Client,
            S3Presigner presigner,
            @Value("${aws.s3.bucket-name}") String bucketName
    ) {
        this.s3Client = s3Client;
        this.presigner = presigner;
        this.bucketName = bucketName;
    }

    public String uploadMusic(MultipartFile file, String fileName) throws IOException {
        String key = "music/" + fileName;

        if (isMusicExists(key)) {
            throw new RuntimeException("File already exists: " + fileName);
        }

        try {
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(file.getContentType())
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );

            return "File uploaded successfully: " + fileName;
        } catch (SdkException e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        }
    }

    public String getStreamUrl(String fileName) {
        String key = "music/" + fileName;

        var getObjectRequest = software.amazon.awssdk.services.s3.model.GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        return presigner.presignGetObject(
                        GetObjectPresignRequest.builder()
                                .signatureDuration(Duration.ofHours(4))
                                .getObjectRequest(getObjectRequest)
                                .build())
                .url()
                .toString();
    }

    public boolean isMusicExists(String key) {
        try {
            s3Client.headObject(HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }

    public void deleteMusic(String fileName) {
        String key = "music/" + fileName;
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build());
    }
}