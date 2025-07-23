package com.example.server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.*;
import java.util.stream.Stream;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET","POST"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt ->{
            Collection<GrantedAuthority> authorities = new ArrayList<>();

            extractRolesFromClaim(jwt,"realm_access",authorities);
            extractRolesFromClaim(jwt,"resource_access",authorities,"");

            return authorities;
        });

        return jwtAuthenticationConverter;
    }

    private void extractRolesFromClaim(Jwt jwt,String claimName,Collection<GrantedAuthority> authorities){
        extractRolesFromClaim(jwt,claimName,authorities,null);
    }

    private void extractRolesFromClaim(Jwt jwt,String claimName,Collection<GrantedAuthority> authorities,String resource){
        Map<String,Object> claim = jwt.getClaim(claimName);
        if(claim != null && claim.containsKey("roles")){
            List<String> roles = (List<String>) claim.get("roles");
            for (String role : roles){
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
            }
        }

        if (resource != null){
            Map<String,Object> resourceAccess = jwt.getClaim(claimName);
            if(resourceAccess != null && resourceAccess.containsKey(resource)){
                List<String> resourceRoles = (List<String>) ((Map<String,Object>) resourceAccess.get(resource));
                if(resourceRoles != null){
                    for (String role : resourceRoles){
                        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
                    }
                }
            }
        }
    }
}