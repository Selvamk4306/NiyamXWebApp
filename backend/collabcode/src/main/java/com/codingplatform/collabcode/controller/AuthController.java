package com.codingplatform.collabcode.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.codingplatform.collabcode.model.LoginRequest;
import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.security.JwtUtil;
import com.codingplatform.collabcode.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController{

    private final AuthService service;
    private final JwtUtil jwt;

    public AuthController(AuthService service, JwtUtil jwt) {
        this.service = service;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    @SuppressWarnings("CallToPrintStackTrace")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = service.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        User user = service.validateUser(request.getEmail(), request.getPassword());

        String token = jwt.generateToken(user.getEmail());

        Map<String, String> res = new HashMap<>();
        res.put("token", token);
        res.put("name", user.getName());
        res.put("email", user.getEmail());

        return res;
    }

    @PutMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String newPassword
    ) {
        service.resetPassword(email, newPassword);
        return "Password updated successfully";
    }
}