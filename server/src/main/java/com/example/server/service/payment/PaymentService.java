package com.example.server.service.payment;


import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.exception.StripeException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface PaymentService {
    String getSessionId(String priceId, String userId) throws StripeException;
    void handleWebhooks(HttpServletRequest request) throws IOException, EventDataObjectDeserializationException;
}
