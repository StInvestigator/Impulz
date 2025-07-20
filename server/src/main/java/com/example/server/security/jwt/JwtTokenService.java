package com.example.server.security.jwt;

public interface JwtTokenService
{
    String getKeycloakIdFromToken(String token);
}
