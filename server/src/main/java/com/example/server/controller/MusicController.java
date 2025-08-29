package com.example.server.controller;

import com.example.server.data.repository.TrackRepository;
import com.example.server.factory.track.TrackFactory;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
    private final MusicServiceImpl musicService;
    private final TrackFactory trackFactory;
    private final TrackRepository trackRepository;
    private final S3Client s3Client;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam String title,
            @RequestParam Long albumId,
            @RequestParam List<String> authorIds,
            @RequestParam List<Long> genreIds
    ) throws IOException {
        try {
            Track track = trackFactory.createTrack(title, albumId, authorIds, genreIds);

            Track savedTrack = musicService.uploadMusic(file, track);
            return ResponseEntity.ok("Track successfully saved with ID: " + savedTrack.getId());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error uploading track: " + e.getMessage());
        }
    }

    @GetMapping("/stream/{id}")
    public ResponseEntity<InputStreamResource> getStreamUrl(@PathVariable Long id, @RequestHeader(value = "Range", required = false) String rangeHeader) {
        try {
            Track track = trackRepository.getTrackById(id);
            if (track == null) {
                return ResponseEntity.notFound().build();
            }
            String key = track.getFileUrl();
            HeadObjectResponse head = musicService.getHeadObjectResponse(key);

            long fileSize = head.contentLength();

            if (rangeHeader != null) {
                String[] ranges = rangeHeader.replace("bytes=", "").split("-");
                long start = Long.parseLong(ranges[0]);
                long end = (ranges.length > 1 && !ranges[1].isEmpty())
                        ? Long.parseLong(ranges[1])
                        : fileSize - 1;

                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                        .header(HttpHeaders.CONTENT_TYPE, head.contentType())
                        .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(end - start + 1))
                        .header(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + fileSize)
                        .body(new InputStreamResource(musicService.getInputStream(key,rangeHeader)));
            } else {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, head.contentType())
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileSize))
                        .body(new InputStreamResource(musicService.getInputStream(key, null)));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
