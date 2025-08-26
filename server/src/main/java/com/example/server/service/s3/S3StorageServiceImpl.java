package com.example.server.service.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class S3StorageServiceImpl implements S3StorageService{

    private final S3Client s3Client;
    private final S3Presigner presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public void uploadFile(File file, String key, String contentType) {
        try {
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(contentType)
                            .build(),
                    RequestBody.fromFile(file)
            );
        } catch (SdkException e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        }
    }

    public String generatePresignedUrl(String key, Duration duration) {
        try {
            var getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            return presigner.presignGetObject(
                    GetObjectPresignRequest.builder()
                            .signatureDuration(duration)
                            .getObjectRequest(getObjectRequest)
                            .build()
            ).url().toString();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate presigned URL: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String key) {
        try {
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
        } catch (SdkException e) {
            throw new RuntimeException("S3 deletion failed: " + e.getMessage(), e);
        }
    }

    public boolean fileExists(String key) {
        try {
            s3Client.headObject(HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        } catch (SdkException e) {
            throw new RuntimeException("S3 check failed: " + e.getMessage(), e);
        }
    }
}