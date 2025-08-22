package com.example.server.service.keycloak.sync;

import com.example.server.model.User;
import org.springframework.security.oauth2.jwt.Jwt;

public interface KeycloakSyncService
{
    User syncUserFromKeycloak(Jwt jwt);
}
