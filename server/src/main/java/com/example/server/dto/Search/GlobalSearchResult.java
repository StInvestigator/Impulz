package com.example.server.dto.Search;

import com.example.server.model.document.AlbumDocument;
import com.example.server.model.document.AuthorDocument;
import com.example.server.model.document.PlaylistDocument;
import com.example.server.model.document.TrackDocument;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GlobalSearchResult
{
    private List<TrackDocument> tracks = new ArrayList<>();
    private List<AuthorDocument> authors = new ArrayList<>();
    private List<AlbumDocument> albums = new ArrayList<>();
    private List<PlaylistDocument> playlists = new ArrayList<>();
}
