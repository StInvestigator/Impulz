package com.example.server.service.track;

import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.Track;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface TrackService
{
    Track getTrackById(Long id);
    TrackDto getTrackDtoById(Long id);
    TrackSimpleDto getTrackSimpleDtoById(Long id);
    void createTrack(Track track);
    Track createTrack(String title, Long albumId, List<String> authorIds,List<Long> genreIds);
    void deleteTrack(Track track);
    Track findTrackByFileUrl(String fileUrl);
    PageDto<TrackSimpleDto> findMostPlayedTracksThisWeek(Pageable pageable);
    PageDto<TrackSimpleDto> getRecommendedTracksToday(Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTrackByUserRecentGenres(String userId, Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTracksByAuthor(String authorId, Pageable pageable);
    PageDto<TrackSimpleDto> findTracksByAuthorWithMultipleAuthors(String authorId, Pageable pageable);
    PageDto<TrackSimpleDto> findPopularTracksByGenre(Long genreId, Pageable pageable);
    PageDto<TrackSimpleDto> findTracksByAlbum(Long albumId, Pageable pageable);
}
