package com.example.server.service.payment;

import com.example.server.service.keycloak.KeycloakService;
import com.stripe.Stripe;
import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.Invoice;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.secret_key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook_secret}")
    private String stripeWebhookSecret;

    @Value("${app.frontend.success-url}")
    private String successUrl;

    @Value("${app.frontend.cancel-url}")
    private String cancelUrl;

    private final KeycloakService keycloakService;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public String getSessionId(String priceId, String userId) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .setSubscriptionData(SessionCreateParams.SubscriptionData.builder()
                        .putMetadata("uid", userId)
                        .build())
                .build();

        Session session = Session.create(params);
        return session.getId();
    }

    @Override
    public void handleWebhooks(HttpServletRequest request) throws IOException, EventDataObjectDeserializationException {
        String payload = readRequestBody(request);

        String sigHeader = request.getHeader("Stripe-Signature");
        if (sigHeader == null) {
            throw new BadRequestException("Stripe-Signature header is required");
        }

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            throw new BadRequestException("Invalid signature");
        } catch (Exception e) {
            throw new BadRequestException("Webhook error: " + e.getMessage());
        }

        String type = event.getType();
        switch (type) {
            case "customer.subscription.updated":
                if (event.getDataObjectDeserializer()
                        .deserializeUnsafe() instanceof Subscription subscription) {
                    if (Objects.equals(subscription.getStatus(), "active")) {
                        keycloakService.addRoleToUser(subscription.getMetadata().get("uid"), "PREMIUM");
                    }
                }
                break;

            case "customer.subscription.deleted":
                if (event.getDataObjectDeserializer()
                        .deserializeUnsafe() instanceof Subscription subscription) {
                    keycloakService.removeRoleFromUser(subscription.getMetadata().get("uid"), "PREMIUM");
                }
                break;

            default:
                log.info("Unhandled event type: " + type);
        }
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
