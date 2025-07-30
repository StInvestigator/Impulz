package com.example.server.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class User {
    private Long id;
    private String email;
    private String password_hash;
    private Role role;
    private List<Playlist> playlists = new ArrayList<>();
    private LocalDate endPremium = null;

}
