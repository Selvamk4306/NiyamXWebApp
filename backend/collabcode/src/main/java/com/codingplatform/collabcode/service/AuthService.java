package com.codingplatform.collabcode.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.codingplatform.collabcode.model.Workspace;
import com.codingplatform.collabcode.repository.WorkspaceRepository;

import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.repository.UserRepository;
import com.codingplatform.collabcode.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;
    private final WorkspaceRepository workspaceRepo;

    public AuthService(UserRepository repo, JwtUtil jwtUtil, WorkspaceRepository workspaceRepo) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
        this.workspaceRepo = workspaceRepo;
    }

    public User register(User user) {

        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));

        User savedUser = repo.save(user);

        Workspace ws = new Workspace();
        ws.setName(savedUser.getName() + "'s Workspace");
        ws.setOwner(savedUser);

        workspaceRepo.save(ws);

        return repo.save(user);
    }

    public User validateUser(String email, String password) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public void resetPassword(String email, String newPassword) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(encoder.encode(newPassword));
        repo.save(user);
    }
}