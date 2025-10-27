package com.example.server.service.audio;

import com.example.server.model.AudioMetadata;
import lombok.extern.slf4j.Slf4j;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Slf4j
@Service
public class AudioServiceImpl implements AudioService {
    public AudioMetadata extractMetadata(MultipartFile multipartFile) {
        File tempFile = null;
        try {
            tempFile = File.createTempFile("audio_", ".mp3");
            multipartFile.transferTo(tempFile);

            AudioFile audioFile = AudioFileIO.read(tempFile);
            AudioHeader audioHeader = audioFile.getAudioHeader();

            return new AudioMetadata(
                    (long) audioHeader.getTrackLength(),
                    multipartFile.getSize(),
                    multipartFile.getContentType(),
                    tempFile.getAbsolutePath()
            );

        } catch (Exception e) {
            if (tempFile != null && tempFile.exists()) {
                try {
                    Files.deleteIfExists(tempFile.toPath());
                } catch (IOException ex) {
                    log.warn("Failed to delete temp file: {}", tempFile.getAbsolutePath(), ex);
                }
            }
            log.error("Audio processing failed for: {}", multipartFile.getOriginalFilename(), e);
            throw new RuntimeException("Audio processing failed: " + e.getMessage(), e);
        }
    }
}