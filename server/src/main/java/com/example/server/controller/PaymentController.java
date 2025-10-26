package com.example.server.controller;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Value("${stripe.secret_key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook_secret}")
    private String stripeWebhookSecret;

    @Value("${app.frontend.success-url}")
    private String successUrl;

    @Value("${app.frontend.cancel-url}")
    private String cancelUrl;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-subscription-session")
    public ResponseEntity<String> createSubscriptionSession(@RequestParam String priceId, @RequestParam String userId) {
        if (priceId == null || priceId.isBlank()) {
            return ResponseEntity.badRequest().body("priceId is required");
        }

        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(cancelUrl)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPrice(priceId) // price id из Stripe, привязанный к продукту и тарифу
                                    .setQuantity(1L)
                                    .build()
                    )
                    .putMetadata("integration_check", "subscription_from_react_app")
                    .putMetadata("uid", userId)
                    .build();

            Session session = Session.create(params);
            return ResponseEntity.ok(session.getId());

        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    /**
     * Webhook endpoint — Stripe будет POST'ить сюда события.
     */
    @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> handleWebhook(HttpServletRequest request) {
        String payload;
        try {
            payload = readRequestBody(request);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to read request body");
        }

        String sigHeader = request.getHeader("Stripe-Signature");
        if (sigHeader == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing Stripe-Signature header");
        }

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook error: " + e.getMessage());
        }

        String type = event.getType();
        try {
            switch (type) {
                case "checkout.session.completed":
                    if (event.getDataObjectDeserializer()
                            .deserializeUnsafe() instanceof Session session) {
                        // TODO: выполнить логику — создать запись в БД: user -> subscriptionId = session.getSubscription()
                        log.info("Checkout session completed: " + session.getMetadata().get("uid"));
                    }
                    break;

                case "invoice.payment_succeeded":
                    log.info("Invoice payment succeeded");
                    break;

                case "invoice.payment_failed":
                    log.info("Invoice payment failed");
                    break;

                default:
                    log.info("Unhandled event type: " + type);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Processing error");
        }

        return ResponseEntity.ok("");
    }

    private String readRequestBody(HttpServletRequest request) throws IOException {
        int contentLength = request.getContentLength();
        ServletInputStream inputStream = request.getInputStream();
        byte[] buf;
        if (contentLength > 0) {
            buf = new byte[contentLength];
            int read = 0;
            while (read < contentLength) {
                int r = inputStream.read(buf, read, contentLength - read);
                if (r == -1) break;
                read += r;
            }
        } else {
            buf = inputStream.readAllBytes();
        }
        return new String(buf, StandardCharsets.UTF_8);
    }
}
