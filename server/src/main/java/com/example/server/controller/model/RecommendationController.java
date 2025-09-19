package com.example.server.controller.model;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Track;
import com.example.server.service.album.AlbumService;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Recommendations")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController
{
    private final TrackService trackService;
    private final AlbumService albumService;

    @GetMapping("/MixedToday")
    public ResponseEntity<Page<Object>> getMixedTodayRecommended(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            Page<Track> tracksPage = trackService.getRecommendedTracksToday(pageable);
            Page<Album> albumsPage = albumService.getRecommendedAlbumsToday(pageable);

            List<TrackSimpleDto> tracks = tracksPage.getContent().stream()
                    .map(TrackSimpleDto::fromEntity)
                    .collect(Collectors.toList());

            List<AlbumSimpleDto> albums = albumsPage.getContent().stream()
                    .map(AlbumSimpleDto::fromEntity)
                    .collect(Collectors.toList());

            List<Object> mixedResults = new ArrayList<>();
            int maxSize = Math.max(tracks.size(), albums.size());

            for (int i = 0; i < maxSize; i++) {
                if (i < tracks.size()) {
                    mixedResults.add(tracks.get(i));
                }
                if (i < albums.size()) {
                    mixedResults.add(albums.get(i));
                }
            }

            Page<Object> mixedPage = new PageImpl<>(
                    mixedResults,
                    pageable,
                    tracksPage.getTotalElements() + albumsPage.getTotalElements()
            );

            return ResponseEntity.ok(mixedPage);
        } catch (Exception e) {
            log.error("Error getting mixed recommendations", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
