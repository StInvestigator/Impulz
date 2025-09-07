package com.example.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.*;

import java.util.List;

@Configuration
public class JwtConfig {

    @Value("${spring.security.oauth2.resource-server.jwt.jwk-set-uri}")
    private String jwkSetUri;

    @Value("${keycloak.frontClientId}")
    private String keycloakClient;

    @Value("${keycloak.clientId}")
    private String keycloakServer;


    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();

        OAuth2TokenValidator<Jwt> timeValidator = new JwtTimestampValidator();

        OAuth2TokenValidator<Jwt> audienceOrAzpValidator = jwt -> {
            List<String> aud = jwt.getAudience();
            String azp = jwt.getClaimAsString("azp");
            boolean ok = (aud != null && ( aud.contains(keycloakClient) || aud.contains(keycloakServer)) )
                    || (azp != null && ( azp.equals(keycloakClient) || azp.equals(keycloakServer) ));

            if (ok) {
                return OAuth2TokenValidatorResult.success();
            }
            OAuth2Error err = new OAuth2Error("invalid_token", "The required audience is missing", null);
            return OAuth2TokenValidatorResult.failure(err);
        };

        jwtDecoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(timeValidator, audienceOrAzpValidator));
        return jwtDecoder;
    }
}
