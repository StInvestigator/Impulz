package com.example.server.service.s3;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class S3StorageServiceImpl implements S3StorageService {

    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public void uploadFromMultipart(MultipartFile file, String key) {
        try {
            PutObjectRequest req = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType() != null ? file.getContentType() : "application/octet-stream")
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(req, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (
                SdkException e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void uploadFile(File file, String key, String contentType) {
        try {
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(contentType != null ? contentType : "application/octet-stream")
                            .build(),
                    RequestBody.fromFile(file)
            );
        } catch (SdkException e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
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

    public HeadObjectResponse getHeadObjectResponse(String key) {
        return s3Client.headObject(
                HeadObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build()
        );
    }

    public InputStream getInputStream(String key, String range) {
        if (range != null) {
            String[] ranges = range.replace("bytes=", "").split("-");
            long start = Long.parseLong(ranges[0]);
            long end = (ranges.length > 1 && !ranges[1].isEmpty())
                    ? Long.parseLong(ranges[1])
                    : getHeadObjectResponse(key).contentLength() - 1;

            String actRange = "bytes=" + start + "-" + end;

            GetObjectRequest rangeRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .range(actRange)
                    .build();

            log.info("Requesting music from S3");
            var res = s3Client.getObject(rangeRequest);
            log.info("Response came, send to front");
            return res;
        } else {
            GetObjectRequest fullRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            return s3Client.getObject(fullRequest);
        }
    }
}