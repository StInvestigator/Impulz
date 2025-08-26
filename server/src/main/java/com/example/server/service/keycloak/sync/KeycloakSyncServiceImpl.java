package com.example.server.service.keycloak.sync;

import com.example.server.model.User;
import com.example.server.data.repository.UserRepository;
import com.example.server.service.keycloak.KeycloakServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KeycloakSyncServiceImpl implements KeycloakSyncService {
    private final UserRepository userRepository;
    private final KeycloakServiceImpl keycloakServiceImpl;

    public User syncUserFromKeycloak(Jwt jwt) {
        Objects.requireNonNull(jwt, "JWT cannot be null");
        String keycloakId = jwt.getSubject();
        String username = jwt.getClaim("preferred_username");
        String email = jwt.getClaim("email");


        log.debug("Syncing user: {}, username: {}, email: {}", keycloakId, username, email);

        return userRepository.findById(keycloakId)
                .map(existingUser -> keycloakServiceImpl.updateExistingUser(existingUser, username, email))
                .orElseGet(() -> keycloakServiceImpl.createNewUser(keycloakId, username, email));
    }
}