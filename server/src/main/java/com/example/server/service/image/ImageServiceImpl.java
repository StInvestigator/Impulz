package com.example.server.service.image;

import com.example.server.service.s3.S3StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    private static final String S3_IMAGE_PREFIX = "image/";
    private final S3StorageService s3StorageService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String uploadImage(MultipartFile file, String title) {
        String key = S3_IMAGE_PREFIX + UUID.randomUUID() + "_" +
                (file.getOriginalFilename() != null ? file.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]","_")
        :(title!=null?title.replaceAll("[^a-zA-Z0-9._-]","_"):UUID.randomUUID()) );
        String S3_ULR = "https://" + bucketName + ".s3." + region + ".amazonaws.com/";

        if (s3StorageService.fileExists(key)) {
            throw new RuntimeException("File already exists: " + key);
        }
        s3StorageService.uploadFromMultipart(file, key);
        return S3_ULR + key;
    }
}
