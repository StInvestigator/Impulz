package com.example.server.service.keycloak;

import com.example.server.model.User;
import org.keycloak.representations.idm.RoleRepresentation;

import java.time.OffsetDateTime;
import java.util.List;


public interface KeycloakService {
    String getUserId();
    User createNewUser(String id, String username, String email);
    void updateUserEmail(String userId, String newEmail);
    void updateUserUsername(String userId, String newUsername);
    void updateUserPassword(String userId, String newPassword);
    List<RoleRepresentation> getAllRoles();
    void addRoleToUser(String userId, String roleName);
    void removeRoleFromUser(String userId, String roleName);
    String getUserIdByEmail(String email);
}
