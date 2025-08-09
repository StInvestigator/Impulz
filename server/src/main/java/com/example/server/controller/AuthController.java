package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.service.KeycloakSyncService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController
{
    private final KeycloakSyncService keycloakSyncService;

    public AuthController(KeycloakSyncService keycloakSyncService) {
        this.keycloakSyncService = keycloakSyncService;
    }

    @GetMapping("/login-success")
    public User handleLoginSuccess(@AuthenticationPrincipal Jwt jwt) {
        return keycloakSyncService.syncUserFromKeycloak(jwt);
    }
}
