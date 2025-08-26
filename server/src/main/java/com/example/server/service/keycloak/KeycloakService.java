package com.example.server.service.keycloak;

import com.example.server.model.User;

import java.time.OffsetDateTime;

public interface KeycloakService
{
    User createNewUser(String id, String username, String email);
    User updateExistingUser(User user, String username, String email);
}
