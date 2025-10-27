package com.example.server.controller;

import com.example.server.service.payment.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;


@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-subscription-session")
    public ResponseEntity<String> createSubscriptionSession(@RequestParam String priceId, @RequestParam String userId) {
        if (priceId == null || priceId.isBlank()) {
            return ResponseEntity.badRequest().body("priceId is required");
        }

        try {
            return ResponseEntity.ok(paymentService.getSessionId(priceId, userId));

        } catch (StripeException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    /**
     * Webhook endpoint — Stripe будет POST'ить сюда события.
     */
    @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> handleWebhook(HttpServletRequest request) {
        try {
            paymentService.handleWebhooks(request);
            return ResponseEntity.ok("");
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
