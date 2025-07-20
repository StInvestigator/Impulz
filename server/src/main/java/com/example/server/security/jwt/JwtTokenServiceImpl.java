package com.example.server.security.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    private final TokenManager tokenManager;

    @Override
    public String getKeycloakIdFromToken(String token) {

        String cutToken = token.substring(7);
        return tokenManager.getSubjectIdFromToken(cutToken);

    }
}
