package com.example.server.service.music;

import com.example.server.model.AudioMetadata;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Track;
import com.example.server.service.audio.AudioService;
import com.example.server.service.s3.S3StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{

    private static final String S3_MUSIC_PREFIX = "music/";
    private final AudioService audioService;

    private final S3StorageService s3StorageService;
    private final TrackRepository trackRepository;

    @Transactional(rollbackFor = Exception.class)
    public Track uploadMusic(MultipartFile file, Track track) {
        String key = S3_MUSIC_PREFIX + UUID.randomUUID() + "_" + track.getTitle().replaceAll("[^a-zA-Z0-9._-]", "_");
        File tempFile = null;

        if (s3StorageService.fileExists(key)) {
            throw new RuntimeException("File already exists: " + track.getTitle());
        }

        try {
            AudioMetadata audioMetadata = audioService.extractMetadata(file);
            track.setFileUrl(key);
            track.setDurationSec(audioMetadata.getDurationSec());

            Track savedTrack = trackRepository.save(track);

            tempFile = new File(audioMetadata.getTempFilePath());
            s3StorageService.uploadFile(tempFile, key, audioMetadata.getContentType());

            return savedTrack;

        } catch (Exception e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        } finally {
            if (tempFile != null && tempFile.exists()) {
                try {
                    boolean deleted = Files.deleteIfExists(tempFile.toPath());
                    if (!deleted) {
                        log.warn("Failed to delete temp file: {}", tempFile.getAbsolutePath());
                    }
                } catch (IOException e) {
                    log.warn("Failed to delete temp file: {}", tempFile.getAbsolutePath(), e);
                }
            }
        }
    }

    public boolean isMusicExists(String key) {
        return s3StorageService.fileExists(key);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteMusic(String fileName) {
        String key = S3_MUSIC_PREFIX + fileName;

        Track track = trackRepository.findTrackByFileUrl(key);
        if (track == null) {
            throw new RuntimeException("Track not found: " + fileName);
        }

        trackRepository.delete(track);

        s3StorageService.deleteFile(key);
    }

    public HeadObjectResponse getHeadObjectResponse(String key){
        return s3StorageService.getHeadObjectResponse(key);
    }

    public InputStream getInputStream(String key, String range){
        return s3StorageService.getInputStream(key,range);
    }
}