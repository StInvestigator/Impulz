package com.example.server.service.music;

import com.example.server.data.AudioMetadata;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Track;
import com.example.server.service.audio.AudioServiceImpl;
import com.example.server.service.s3.S3StorageServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{

    private static final String S3_MUSIC_PREFIX = "music/";

    private final S3StorageServiceImpl s3StorageService;
    private final AudioServiceImpl audioService;
    private final TrackRepository trackRepository;

    @Transactional(rollbackFor = Exception.class)
    public Track uploadMusic(MultipartFile file, Track track) {
        String key = S3_MUSIC_PREFIX + track.getTitle();

        if (s3StorageService.fileExists(key)) {
            throw new RuntimeException("File already exists: " + track.getTitle());
        }

        AudioMetadata metadata = audioService.extractMetadata(file);

        track.setFileUrl(key);
        track.setDurationSec(metadata.getDurationSec());
        Track savedTrack = trackRepository.save(track);

        try {
            s3StorageService.uploadFile(file, key, metadata.getContentType());
            return savedTrack;

        } catch (Exception e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        }
    }

    public String getStreamUrl(String fileUrl) {
        return s3StorageService.generatePresignedUrl(
                fileUrl,
                Duration.ofHours(4)
        );
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
}