package com.example.server.controller;

import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Track;
import com.example.server.service.music.MusicService;
import com.example.server.service.music.MusicServiceImpl;
import com.example.server.service.track.TrackService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
    private final MusicService musicService;
    private final TrackService trackService;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${server.url}")
    private String baseUrl;

    @GetMapping("/link/{id}")
    public ResponseEntity<String> getLink(@PathVariable Long id) {
        String token = Jwts.builder()
                .setSubject("stream:" + id)
                .setExpiration(new Date(System.currentTimeMillis() + 14_400_000))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        String url = String.format(baseUrl + "/api/music/stream/%d?token=%s", id, token);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/stream/{id}")
    public ResponseEntity<InputStreamResource> stream(@PathVariable Long id,
                                                      @RequestParam String token,
                                                      @RequestHeader(value = "Range", required = false) String rangeHeader) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            if (!claims.getSubject().equals("stream:" + id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Track track = trackService.getTrackById(id);
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
                        .body(new InputStreamResource(musicService.getInputStream(key, rangeHeader)));
            } else {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, head.contentType())
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileSize))
                        .body(new InputStreamResource(musicService.getInputStream(key, null)));
            }
        } catch (
                Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
