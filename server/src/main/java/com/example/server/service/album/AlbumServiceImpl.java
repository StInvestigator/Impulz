package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.UserFavouriteAlbumRepository;
import com.example.server.dto.Album.AlbumCreationDto;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Album;
import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.key.UserFavoriteAlbumKey;
import com.example.server.service.author.AuthorService;
import com.example.server.service.image.ImageService;
import com.example.server.service.track.TrackService;
import com.example.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService
{
    private final AlbumRepository albumRepository;
    private final AuthorService authorService;
    private final TrackService trackService;
    private final ImageService imageService;
    private final UserService userService;
    private final UserFavouriteAlbumRepository userFavouriteAlbumRepository;

    @Override
    public Album getById(Long id) {
        return albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + id));
    }

    public AlbumDto getAlbumDtoById(Long id){
        return AlbumDto.fromEntity(albumRepository.findById(id).orElseThrow());
    }

    public AlbumSimpleDto getAlbumSimpleDtoById(Long id){
        return AlbumSimpleDto.fromEntity(albumRepository.findById(id).orElseThrow());
    }

    public void create(Album album){
        albumRepository.save(album);
    }

    @Caching(evict = {
            @CacheEvict(cacheNames = {"album.recommendedToday","album.byAuthor",
                    "album.collaborationsByAuthor", "album.collaborationsByAuthor",
                    "album.byAuthorReleaseDateDesc", "album.byGenreReleaseDateDesc"}, allEntries = true)
    })
    public void delete(Long id){
        albumRepository.deleteById(id);
    }

    @Cacheable(value = "album.recommendedToday")
    public PageDto<AlbumSimpleDto> getRecommendedAlbumsToday(Pageable pageable) {
        return new PageDto<>(albumRepository.findRecommendedAlbumsToday(pageable).map(AlbumSimpleDto::fromEntity));
    }

    public PageDto<AlbumSimpleDto> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable){
        return new PageDto<>(albumRepository.findPopularAlbumsByUserRecentGenres(userId, pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findByAuthor(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findByAuthorsContainingAndReleaseDateLessThanEqual(authorService.getAuthorById(authorId), OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.collaborationsByAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findCollaborationsByAuthor(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findAlbumsByAuthorWithMultipleAuthors(authorId, pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byAuthorReleaseDateDesc",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findByAuthors_IdAndReleaseDateLessThanEqualOrderByReleaseDateDesc(authorId, OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byGenreReleaseDateDesc",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findNewAlbumsByGenre(Long genreId, Pageable pageable) {
        return new PageDto<>(albumRepository.findNewAlbumsByGenre(genreId,pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Override
    public Album upload(AlbumCreationDto metadata, MultipartFile cover, List<MultipartFile> trackFiles, List<MultipartFile> trackCovers) {
        Album entity = new Album();
        entity.setImageUrl(imageService.uploadImage(cover,metadata.getTitle()));
        entity.setTitle(metadata.getTitle());
        entity.setAuthors(new HashSet<>(authorService.getAuthorsByIds(metadata.getAuthorIds())));
        entity.setCreatedAt(OffsetDateTime.now());
        entity.setReleaseDate(metadata.getReleaseDate().atStartOfDay().atOffset(ZoneOffset.MIN));
        albumRepository.save(entity);

        trackService.uploadTracks(metadata.getTracks(),trackCovers, trackFiles, entity);

        return entity;
    }

    @Override
    public Page<AlbumSimpleDto> findFavoriteByUserId(String userId, Pageable pageable) {
        return albumRepository.findAllFavoriteByUserId(userId,pageable).map(AlbumSimpleDto::fromEntity);
    }

    @Override
    public List<Album> findAlbumsByIds(List<Long> ids) {
        return albumRepository.findAllById(ids);
    }

    @Override
    public void like(Long albumId, String userId) {
        UserFavoriteAlbum entity = new UserFavoriteAlbum();
        entity.setId(new UserFavoriteAlbumKey(userId, albumId));
        entity.setUser(userService.getUserById(userId));
        entity.setAlbum(albumRepository.findById(albumId).orElseThrow());
        entity.setAddedAt(OffsetDateTime.now());
        userFavouriteAlbumRepository.save(entity);
    }
}
