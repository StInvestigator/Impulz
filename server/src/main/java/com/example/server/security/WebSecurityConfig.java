package com.example.server.security;

import com.example.server.security.jwt.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import com.example.server.security.jwt.JwtAuthConverter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig
{
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthConverter jwtAuthConverter;

    private static final String[] WHITE_LIST ={
        "/keycloak/**",
        "/swagger-ui/**"
    };

    private static final String[] HTTP_GET_WHITE_LIST = {

    };

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(request -> request
                    .requestMatchers(WHITE_LIST).permitAll()
                    .requestMatchers(HttpMethod.GET,HTTP_GET_WHITE_LIST).permitAll()
                    .anyRequest().authenticated())
                .cors(Customizer.withDefaults())
                .headers(headers -> headers.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                        httpSecurityExceptionHandlingConfigurer
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(configurer -> configurer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(serverConfigurer ->
                serverConfigurer.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter)));
        return http.build();
    }
}
