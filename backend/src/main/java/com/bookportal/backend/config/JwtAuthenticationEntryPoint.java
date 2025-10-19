package com.bookportal.backend.config;

import com.bookportal.backend.util.ErrorMessages;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        String message = authException.getMessage();

        if (message == null || message.isBlank()) {
            message = ErrorMessages.UNAUTHORIZED.getMessage();
        } else if (message.toLowerCase().contains("expired")) {
            message = ErrorMessages.JWT_EXPIRED.getMessage();
        } else if (message.toLowerCase().contains("invalid")) {
            message = ErrorMessages.INVALID_JWT.getMessage();
        } else {
            message = ErrorMessages.UNAUTHORIZED.getMessage();
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.getWriter().write("{\"message\":\"" + message + "\"}");
    }
}
