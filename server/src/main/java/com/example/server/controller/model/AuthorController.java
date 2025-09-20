package com.example.server.controller.model;

import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Author.AuthorDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.Track;
import com.example.server.model.User;
import com.example.server.service.author.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/authors")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @GetMapping("/simpleDto/{id}")
    public AuthorSimpleDto getAuthorSimpleDto(@PathVariable String id) {
        return authorService.getAuthorSimpleDtoById(id);
    }

    @GetMapping("/Dto/{id}")
    public AuthorDto getAuthorDto(@PathVariable String id) {
        return authorService.getAuthorDtoById(id);
    }

    @GetMapping("/Followers/{id}")
    public ResponseEntity<PageDto<UserSimpleDto>> getFollowers(@PathVariable String id, Pageable pageable) {
        return ResponseEntity.ok( authorService.findFollowers(id, pageable));
    }

    @GetMapping("/BestAuthorsOfMonth")
    public ResponseEntity<PageDto<AuthorSimpleDto>> findTopAuthorsOfMonth(Pageable pageable) {
        return ResponseEntity.ok( authorService.findTopAuthorsOfMonth(pageable));
    }

    @GetMapping("/SimilarByGenres/{authorId}")
    public ResponseEntity<PageDto<AuthorSimpleDto>> findSimilarAuthorsByGenres(@PathVariable String authorId, Pageable pageable) {
           return ResponseEntity.ok( authorService.findSimilarBySharedGenres(authorId, pageable));
    }

    @GetMapping("/TopInGenre/{genreId}")
    public ResponseEntity<PageDto<AuthorSimpleDto>> findTopInGenre(@PathVariable Long genreId, Pageable pageable) {
            return ResponseEntity.ok(authorService.findTopAuthorsByGenre(genreId, pageable));
    }

    @GetMapping("/getCountAuthorPlaysByMonth/{authorId}")
    public ResponseEntity<Long> getCountAuthorPlaysByMonth(@PathVariable String authorId){
        try {
            return ResponseEntity.ok(authorService.countAuthorPlaysByMonth(authorId));
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/{authorId}/subscribe")
    public ResponseEntity<?> subscribeToAuthor(@PathVariable String authorId, Principal principal) {
        try {
            String userId = principal.getName();
            authorService.subscribeToAuthor(userId, authorId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{authorId}/unsubscribe")
    public ResponseEntity<?> unsubscribeFromAuthor(@PathVariable String authorId, Principal principal) {
        try {
            String userId = principal.getName();
            authorService.unsubscribeFromAuthor(userId, authorId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{authorId}/subscription-status")
    public ResponseEntity<Map<String, Boolean>> checkSubscriptionStatus(
            @PathVariable String authorId,
            Principal principal
    ) {
        try {
            String userId = principal.getName();
            boolean isSubscribed = authorService.isUserSubscribed(userId, authorId);
            return ResponseEntity.ok(Map.of("isSubscribed", isSubscribed));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}