package com.example.server.service.track;

import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.*;
import com.example.server.model.Album;
import com.example.server.model.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService
{
    Track getTrackById(Long id);
    TrackDto getTrackDtoById(Long id);
    TrackDtoWithFavorite getTrackDtoById(Long id, String userId);
    TrackSimpleDto getTrackSimpleDtoById(Long id);
    TrackSimpleDtoWithFavorite getTrackSimpleDtoById(Long id, String userId);
    void deleteTrack(Track track);
    PageDto<TrackSimpleDto> findMostPlayedTracksThisWeek(Pageable pageable);
    PageDto<TrackSimpleDto> getRecommendedTracksToday(Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTrackByUserRecentGenres(String userId, Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTracksByAuthor(String authorId, Pageable pageable);
    PageDto<TrackSimpleDto> findTracksByAuthorWithMultipleAuthors(String authorId, Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTracksByGenre(Long genreId, Pageable pageable);
    PageDto<TrackSimpleDto> findTracksByAlbum(Long albumId, Pageable pageable);
    PageDto<TrackSimpleDto> findTracksByPlaylist(Long playlistId, Pageable pageable);
    Track uploadTrack(TrackCreationDto creationDto, MultipartFile cover, MultipartFile file, Album album);
    List<Track> uploadTracks(List<TrackCreationDto> creationDtos, List<MultipartFile> covers, List<MultipartFile> files, Album album);
    List<Long> getUserFavoriteFromTrackIds(String userId, List<Long> trackIds);
    void like(Long trackId, String userId);
    List<Track> getTracksByIds(List<Long> trackIds);
    PageDto<TrackSimpleDto> getLikedTracksByUserId(String userId,Pageable pageable);
}
