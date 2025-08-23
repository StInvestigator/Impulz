package com.example.server.service.audio;

import com.example.server.data.AudioMetadata;
import org.springframework.web.multipart.MultipartFile;

public interface AudioService {
    AudioMetadata extractMetadata(MultipartFile file);
}
