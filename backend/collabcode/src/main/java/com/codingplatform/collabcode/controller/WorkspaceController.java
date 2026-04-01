package com.codingplatform.collabcode.controller;

import org.springframework.web.bind.annotation.*;

import com.codingplatform.collabcode.model.Workspace;
import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.security.JwtUtil;
import com.codingplatform.collabcode.service.WorkspaceService;
import com.codingplatform.collabcode.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/workspace")
@CrossOrigin
public class WorkspaceController {

    private final WorkspaceService service;
    private final JwtUtil jwt;
    private final UserRepository userRepo;

    public WorkspaceController(WorkspaceService service, JwtUtil jwt, UserRepository userRepo) {
        this.service = service;
        this.jwt = jwt;
        this.userRepo = userRepo;
    }

    @PostMapping("/create")
    public Workspace createWorkspace(
            @RequestHeader("Authorization") String token,
            @RequestParam String name
    ) {
        String email = jwt.extractEmail(token.replace("Bearer ", ""));
        return service.createWorkspace(name, email);
    }

    @PostMapping("/{wid}/add")
    public Workspace addUser(
            @PathVariable Long wid,
            @RequestParam String email
    ) {
        return service.addUserToWorkspace(wid, email);
    }

    @GetMapping("/{wid}/members")
    public List<User> getMembers(@PathVariable Long wid) {
        return service.getMembers(wid);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/user")
    public Long getWorkspaceIdByUser(@RequestParam String email) {
        return service.getWorkspaceIdByEmail(email);
    }
}