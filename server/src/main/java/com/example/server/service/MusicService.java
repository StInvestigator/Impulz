package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class MusicService
{
    private final S3Client s3Client;
    private final String bucketName = "ImpulzMusic";

    public MusicService(S3Client s3Client){
        this.s3Client = s3Client;
    }

    public String uploadMusic(MultipartFile file,String fileName){
        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key("music/" + fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            return "File uploaded: " + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Error file upload: ",e);
        }
    }

    public String getMusicUrl(String fileName)
    {
        return s3Client.utilities()
                .getUrl(builder -> builder
                        .bucket(bucketName)
                        .key("music/" + fileName))
                .toString();
    }
}
