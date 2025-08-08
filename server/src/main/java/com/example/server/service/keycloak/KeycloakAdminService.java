package com.example.server.service.keycloak;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class KeycloakAdminService {
    @Value("${keycloak.keycloakUrl}")
    private String keycloakUrl;
    @Value("${keycloak.realm}")
    private String realm;
    @Value("${keycloak.clientId}")
    private String clientId;
    @Value("${keycloak.clientSecret}")
    private String clientSecret;

    private String getAdminAccessToken() {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = rest.postForEntity(
                keycloakUrl + "/realms/" + realm + "/protocol/openid-connect/token", request, Map.class);

        return (String) response.getBody().get("access_token");
    }

    public void assignRealmRoleToUser(String username, String roleName) {
        String token = getAdminAccessToken();
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        // 1. Получаем пользователя по username
        ResponseEntity<List> usersResponse = rest.exchange(
                keycloakUrl + "/admin/realms/" + realm + "/users?username=" + username,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                List.class
        );

        if (usersResponse.getBody().isEmpty()) {
            throw new RuntimeException("User not found");
        }
        Map user = (Map) usersResponse.getBody().get(0);
        String userId = (String) user.get("id");

        // 2. Получаем роль
        ResponseEntity<Map> roleResponse = rest.exchange(
                keycloakUrl + "/admin/realms/" + realm + "/roles/" + roleName,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class
        );

        Map role = roleResponse.getBody();

        // 3. Назначаем роль
        HttpHeaders assignHeaders = new HttpHeaders();
        assignHeaders.setContentType(MediaType.APPLICATION_JSON);
        assignHeaders.setBearerAuth(token);

        List<Map<String, String>> rolesToAdd = List.of(
                Map.of("id", (String) role.get("id"), "name", (String) role.get("name"))
        );

        HttpEntity<List<Map<String, String>>> assignRequest = new HttpEntity<>(rolesToAdd, assignHeaders);

        rest.postForEntity(
                keycloakUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/realm",
                assignRequest,
                Void.class
        );
    }
}