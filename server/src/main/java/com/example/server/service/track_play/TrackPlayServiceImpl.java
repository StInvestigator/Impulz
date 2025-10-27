package com.example.server.service.track_play;

import com.example.server.data.repository.TrackPlayRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.data.repository.UserRepository;
import com.example.server.dto.TrackPlay.PlaybackRequest;
import com.example.server.model.Track;
import com.example.server.model.TrackPlay;
import com.example.server.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class TrackPlayServiceImpl implements TrackPlayService {
    private final TrackPlayRepository trackPlayRepository;
    private final TrackRepository trackRepository;
    private final UserRepository userRepository;

    private final ConcurrentHashMap<String, Boolean> playbackSessionCache = new ConcurrentHashMap<>();

    @Async
    @Transactional
    public void recordPlayback(PlaybackRequest request) {
        try {
            if (request.getSessionId() == null || request.getSessionId().isEmpty()) {
                log.warn("Пустой sessionId в запросе");
                return;
            }

            if (playbackSessionCache.containsKey(request.getSessionId())) {
                log.debug("Сессия {} уже обработана (кэш)", request.getSessionId());
                return;
            }

            if (trackPlayRepository.existsBySessionId(request.getSessionId())) {
                log.debug("Сессия {} уже существует в БД", request.getSessionId());
                playbackSessionCache.put(request.getSessionId(), true);
                return;
            }

            playbackSessionCache.put(request.getSessionId(), true);

            String userId = request.getUserId();
            Optional<Track> trackOpt = trackRepository.findById(request.getTrackId());
            if (trackOpt.isEmpty()) {
                log.warn("Трек с ID {} не найден", request.getTrackId());
                return;
            }

            Track track = trackOpt.get();
            double currentTime = request.getCurrentTime();
            double trackDuration = track.getDurationSec();

            boolean shouldRecord = currentTime >= 30 ||
                    Math.abs(currentTime - trackDuration) < 0.5 ||
                    currentTime >= trackDuration * 0.7;

            if (shouldRecord) {
                createAndSaveTrackPlay(track, userId, request.getSessionId());
                log.info("Записано прослушивание для трека {}, сессия {}", track.getId(), request.getSessionId());
            } else {
                log.debug("Прослушивание не записано: currentTime={}, duration={}", currentTime, trackDuration);
            }
        } catch (Exception e) {
            log.error("Ошибка при обработке playback запроса", e);
        }
    }

    private void createAndSaveTrackPlay(Track track, String userId, String sessionId) {
        try {
            TrackPlay trackPlay = new TrackPlay();
            trackPlay.setTrack(track);
            trackPlay.setPlayedAt(OffsetDateTime.now());
            trackPlay.setSessionId(sessionId);

            if (userId != null && !"unknown-user".equals(userId)) {
                Optional<User> userOpt = userRepository.findById(userId);
                userOpt.ifPresent(trackPlay::setUser);
            }

            trackPlayRepository.save(trackPlay);
            trackRepository.incrementTotalPlays(track.getId());

        } catch (Exception e) {
            log.error("Ошибка при сохранении TrackPlay", e);
            playbackSessionCache.remove(sessionId);
        }
    }

    public Long getWeeklyPlaysCount(Long trackId) {
        return trackPlayRepository.countWeeklyPlaysByTrackIdNative(trackId);
    }

    @Scheduled(fixedRate = 6 * 60 * 60 * 1000)
    public void cleanupOldSessions() {
        try {
            int initialSize = playbackSessionCache.size();
            playbackSessionCache.keySet().removeIf(sessionId -> {
                try {
                    String[] parts = sessionId.split("-");
                    if (parts.length > 0) {
                        long timestamp = Long.parseLong(parts[0]);
                        return System.currentTimeMillis() - timestamp > 48 * 60 * 60 * 1000;
                    }
                    return true;
                } catch (NumberFormatException e) {
                    log.warn("Некорректный sessionId: {}", sessionId);
                    return true;
                }
            });
            log.info("Очищено {} устаревших сессий из кэша", initialSize - playbackSessionCache.size());
        } catch (Exception e) {
            log.error("Ошибка при очистке кэша сессий", e);
        }
    }

    public int getCacheSize() {
        return playbackSessionCache.size();
    }
}