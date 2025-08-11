package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.model.repository.UserRepository;
import com.example.server.service.KeycloakSyncService;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final KeycloakSyncService keycloakSyncService;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @PostMapping("/login-success")
    public ResponseEntity<?> handleLoginSuccess(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        JwtDecoder decoder = JwtDecoders.fromIssuerLocation(issuerUri);
        Jwt jwt = decoder.decode(token);

        log.info("Processing login for user: {}", jwt.getSubject());
        try {
            User user = keycloakSyncService.syncUserFromKeycloak(jwt);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Login processing failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}