package com.example.server.security;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KeycloakClient
{
    private final RestTemplate restTemplate = new RestTemplate();
    private final KeycloakClientConfig config;

    public AccessTokenResponse authenticate(String email,String password){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String,String> uriParams = new LinkedMultiValueMap<>();
        uriParams.add("email",email);
        uriParams.add("password",password);
        uriParams.add("grant_type","password");
        uriParams.add("client_id", config.getClientId());
        uriParams.add("client_secret", config.getClientSecret());

        HttpEntity<MultiValueMap<String,String>> entity =
                new HttpEntity<>(uriParams,httpHeaders);

        return restTemplate.exchange(getAuthUrl(),
                HttpMethod.POST,
                entity,
                AccessTokenResponse.class).getBody();
    }

    private String getAuthUrl(){
        return UriComponentsBuilder.fromHttpUrl(config.getUrl())
                .pathSegment("realms")
                .pathSegment(config.getRealm())
                .pathSegment("protocol")
                .pathSegment("openid-connect")
                .pathSegment("token").toUriString();
    }
}
