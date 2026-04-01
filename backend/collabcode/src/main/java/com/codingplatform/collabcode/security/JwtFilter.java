package com.codingplatform.collabcode.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    private final JwtUtil jwt;

    public JwtFilter(JwtUtil jwt) {
        this.jwt = jwt;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        
        try {
            String header = req.getHeader("Authorization");
            
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                String email = jwt.extractEmail(token);

                if (email != null) {
                    SecurityContextHolder.getContext().setAuthentication(
                        new JwtAuthentication(email)
                    );
                }
            }
        } catch (Exception e) {
            // 🔥 IGNORE TOKEN ERRORS (IMPORTANT)
            System.out.println("JWT Error: " + e.getMessage());
        }
        String path = req.getRequestURI();

        if(path.contains("/api/auth/login") || path.contains("/api/auth/register")){
            chain.doFilter(request, response);
            return;
        }

        chain.doFilter(request, response);
    }
}