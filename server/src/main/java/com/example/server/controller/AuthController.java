package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.service.keycloak.sync.KeycloakSyncServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final KeycloakSyncServiceImpl keycloakSyncServiceImpl;
    private final JwtDecoder jwtDecoder;

    @PostMapping("/login-success")
    public ResponseEntity<String> handleLoginSuccess(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.replace("Bearer ", "").trim();

        try {
            Jwt jwt = jwtDecoder.decode(token);
            log.info("Processing login for user: {}", jwt.getSubject());
            keycloakSyncServiceImpl.syncUserFromKeycloak(jwt);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            log.error("Login processing failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}