package com.codingplatform.collabcode.controller;

import com.codingplatform.collabcode.model.Project;
import com.codingplatform.collabcode.security.JwtUtil;
import com.codingplatform.collabcode.service.ProjectService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService projectService;
    private final JwtUtil jwt;

    public ProjectController(ProjectService projectService, JwtUtil jwt) {
        this.projectService = projectService;
        this.jwt = jwt;
    }

    // ✅ CREATE
    @PostMapping
    public Project createProject(
            @RequestHeader("Authorization") String token,
            @RequestBody Project project
    ) {
        String email = jwt.extractEmail(token.replace("Bearer ", ""));
        return projectService.saveProject(project, email);
    }

    // ✅ GET USER PROJECTS ONLY
    @GetMapping
    public List<Project> getProjects(
            @RequestHeader("Authorization") String token
    ) {
        String email = jwt.extractEmail(token.replace("Bearer ", ""));
        return projectService.getUserProjects(email);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}