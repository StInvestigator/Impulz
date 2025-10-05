package com.example.server.service.keycloak;

import com.example.server.model.User;
import org.keycloak.representations.idm.RoleRepresentation;

import java.time.OffsetDateTime;
import java.util.List;

public interface KeycloakService
{
    User createNewUser(String id, String username, String email);
    User updateExistingUser(User user, String username, String email);
    void addRoleToUser(String userId, String role);
    void removeRoleFromUser(String userId, String role);
    List<RoleRepresentation> getAllRoles();
    String getUserIdByEmail(String email);
}
