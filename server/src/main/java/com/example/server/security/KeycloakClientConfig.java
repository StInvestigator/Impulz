package com.example.server.security;

import lombok.Getter;
import lombok.Setter;
import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
@ConfigurationProperties(prefix = "keycloak")
@Getter
@Lazy
@Setter
public class KeycloakClientConfig
{
    private String url;
    private String realm;
    private String clientId;
    private String clientSecret;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(url)
                .realm(realm)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .resteasyClient(new ResteasyClientBuilderImpl().connectionPoolSize(10).build())
                .build();
    }
}
