package com.example.server.service.track;

import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Track;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService
{
    private final TrackRepository trackRepository;

    @Override
    public Track getTrackById(Long id) {
        return trackRepository.getTrackById(id);
    }

    @Override
    public Track findTrackByFileUrl(String fileUrl) {
        return trackRepository.findTrackByFileUrl(fileUrl);
    }

    @Override
    public List<Track> findTop20MostPlayedTracksThisWeek() {
        return trackRepository.findTop20MostPlayedTracksThisWeek();
    }
}
