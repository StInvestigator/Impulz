package com.example.server.service.audio;

import com.example.server.data.AudioMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ws.schild.jave.EncoderException;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.info.MultimediaInfo;

import java.io.File;
import java.io.IOException;

@Service
public class AudioServiceImpl implements AudioService {
    @Value("${app.temp-dir:/tmp}")
    private String tempDir;

    public AudioMetadata extractMetadata(MultipartFile file) {
        File tempFile = null;
        try {
            tempFile = File.createTempFile("audio", ".mp3", new File(tempDir));
            file.transferTo(tempFile);

            MultimediaObject multimediaObject = new MultimediaObject(tempFile);
            MultimediaInfo info = multimediaObject.getInfo();

            return new AudioMetadata(
                    info.getDuration() / 1000,
                    file.getSize(),
                    file.getContentType()
            );

        } catch (EncoderException | IOException e) {
            throw new RuntimeException("Audio processing failed: " + e.getMessage(), e);
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}
