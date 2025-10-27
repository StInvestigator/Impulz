package com.example.server.service.elasticsearch.document;

import com.example.server.model.document.AlbumDocument;
import com.example.server.model.document.AuthorDocument;
import com.example.server.model.document.PlaylistDocument;
import com.example.server.model.document.TrackDocument;
import com.example.server.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentConversionService
{
    public TrackDocument convertToDocument(Track track){
        TrackDocument doc = new TrackDocument();
        doc.setId(track.getId());
        doc.setTitle(track.getTitle());

        if(track.getAuthors() != null)
        {
            doc.setAuthorNames(track.getAuthors().stream()
                    .map(author -> author.getUser().getUsername())
                    .collect(Collectors.toList()));
        }

        if(track.getGenres() != null){
            doc.setGenreNames(track.getGenres().stream()
                    .map(Genre::getName)
                    .collect(Collectors.toList()));
        }

        if(track.getAlbum() != null){
            doc.setAlbumTitle(track.getAlbum().getTitle());
        }

        doc.setSearchText(buildTrackSearchText(track));

        return doc;
    }

    private String buildTrackSearchText(Track track){
        StringBuilder sb = new StringBuilder();
        sb.append(track.getTitle()).append(" ");

        if (track.getAuthors() != null) {
            track.getAuthors().forEach(author ->
                sb.append(author.getUser().getUsername()).append(" "));
        }

        if (track.getAlbum() != null) {
            sb.append(track.getAlbum().getTitle()).append(" ");
        }

        if (track.getGenres() != null) {
            track.getGenres().forEach(genre ->
                    sb.append(genre.getName()).append(" "));
        }

        return sb.toString().trim();
    }

    public AuthorDocument convertToDocument(Author author){
        AuthorDocument doc = new AuthorDocument();
        doc.setId(author.getId());
        doc.setName(author.getUser().getUsername());
        doc.setSearchText(buildAuthorSearchText(author));

        return doc;
    }

    private String buildAuthorSearchText(Author author){
        return author.getUser().getUsername();
    }

    public AlbumDocument convertToDocument(Album album) {
        AlbumDocument doc = new AlbumDocument();
        doc.setId(album.getId());
        doc.setTitle(album.getTitle());

        if (album.getAuthors() != null) {
            doc.setAuthorNames(album.getAuthors().stream()
                    .map(author -> author.getUser().getUsername())
                    .collect(Collectors.toList()));
        }

        doc.setSearchText(buildAlbumSearchText(album));
        return doc;
    }

    private String buildAlbumSearchText(Album album) {
        StringBuilder sb = new StringBuilder();
        sb.append(album.getTitle()).append(" ");

        if (album.getAuthors() != null) {
            album.getAuthors().forEach(author ->
                    sb.append(author.getUser().getUsername()).append(" "));
        }

        return sb.toString().trim();
    }

    public PlaylistDocument convertToDocument(Playlist playlist) {
        PlaylistDocument doc = new PlaylistDocument();
        doc.setId(playlist.getId());
        doc.setTitle(playlist.getTitle());
        doc.setIsPublic(playlist.getIsPublic());
        doc.setOwnerName(playlist.getOwner().getUsername());
        doc.setSearchText(buildPlaylistSearchText(playlist));
        return doc;
    }

    private String buildPlaylistSearchText(Playlist playlist) {
        return playlist.getTitle() + " " + playlist.getOwner().getUsername();
    }

}
