package com.example.server.security.jwt;

import com.example.server.exception.JwtTokenNotFoundException;
import org.keycloak.TokenVerifier;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessToken;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class TokenManager implements Serializable
{
    public String getSubjectIdFromToken(String token){
        try {
            return TokenVerifier.create(token, AccessToken.class).getToken().getSubject();
        }
        catch (VerificationException e)
        {
            throw new JwtTokenNotFoundException(token);
        }
    }
}
