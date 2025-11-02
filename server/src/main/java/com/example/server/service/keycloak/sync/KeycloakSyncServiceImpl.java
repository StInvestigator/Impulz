package com.example.server.service.keycloak.sync;

import com.example.server.model.User;
import com.example.server.data.repository.UserRepository;
import com.example.server.service.image.ImageService;
import com.example.server.service.keycloak.KeycloakServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final ImageService imageService;

    public User syncUserFromKeycloak(Jwt jwt) {
        Objects.requireNonNull(jwt, "JWT cannot be null");
        String keycloakId = jwt.getSubject();
        String keycloakUsername = jwt.getClaim("preferred_username");
        String keycloakEmail = jwt.getClaim("email");

        log.debug("Syncing user from Keycloak: {}, username: {}, email: {}",
                keycloakId, keycloakUsername, keycloakEmail);

        return userRepository.findById(keycloakId)
                .map(existingUser -> updateFromKeycloak(existingUser, keycloakUsername, keycloakEmail))
                .orElseGet(() -> keycloakServiceImpl.createNewUser(keycloakId, keycloakUsername, keycloakEmail));
    }

    public User updateEmail(String userId, String newEmail) {
        log.info("Updating email for user {}: {}", userId, newEmail);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        if (newEmail == null || newEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }

        if (newEmail.equals(user.getEmail())) {
            log.info("Email is the same, no update needed for user: {}", userId);
            return user;
        }

        try {
            keycloakServiceImpl.updateUserEmail(userId, newEmail);

            user.setEmail(newEmail);

            User savedUser = userRepository.save(user);
            log.info("Email updated successfully for user: {}", userId);

            return savedUser;

        } catch (Exception e) {
            log.error("Failed to update email for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to update email: " + e.getMessage(), e);
        }
    }

    public User updateUsername(String userId, String newUsername) {
        log.info("Updating username for user {}: {}", userId, newUsername);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        user.setUsername(newUsername);

        User savedUser = userRepository.save(user);
        log.info("Username updated successfully for user: {}", userId);

        return savedUser;
    }

    public User updateAvatar(String userId, String avatarUrl) {
        log.info("Updating avatar for user: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        user.setAvatarUrl(avatarUrl);

        return userRepository.save(user);
    }

    public User updateUserProfile(String userId, String username, String email, MultipartFile imageFile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        if (username != null && !username.equals(user.getUsername())) {
            user.setUsername(username);
        }

        if (email != null && !email.equals(user.getEmail())) {
            updateEmail(userId, email);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageTitle = "user_" + userId + "_avatar";
            String newImageUrl = imageService.uploadImage(imageFile, imageTitle);

            if (user.getAvatarUrl() != null && !user.getAvatarUrl().isEmpty()) {
                try {
                    imageService.deleteImage(user.getAvatarUrl());
                } catch (Exception e) {
                    log.warn("Failed to delete old avatar: {}", user.getAvatarUrl(), e);
                }
            }

            user.setAvatarUrl(newImageUrl);
        }

        return userRepository.save(user);
    }

    private User updateFromKeycloak(User existingUser, String keycloakUsername, String keycloakEmail) {
        if (!Objects.equals(existingUser.getEmail(), keycloakEmail)) {
            log.info("Email synced from Keycloak for user {}: {} -> {}",
                    existingUser.getId(), existingUser.getEmail(), keycloakEmail);
            existingUser.setEmail(keycloakEmail);
        }

        log.debug("Local username preserved: {}", existingUser.getUsername());

        return userRepository.save(existingUser);
    }
}