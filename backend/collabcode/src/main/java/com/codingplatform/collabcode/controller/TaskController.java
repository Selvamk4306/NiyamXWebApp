package com.codingplatform.collabcode.controller;

import org.springframework.web.bind.annotation.*;

import com.codingplatform.collabcode.model.Task;
import com.codingplatform.collabcode.security.JwtUtil;
import com.codingplatform.collabcode.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService service;
    private final JwtUtil jwt;

    public TaskController(TaskService service, JwtUtil jwt) {
        this.service = service;
        this.jwt = jwt;
    }

    // ✅ CREATE TASK (NO userId required)
    @PostMapping
    public Task create(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestParam Long projectId,
            @RequestBody Task task
    ) {
        System.out.println("TOKEN: " + token);

        if (token == null) {
            throw new RuntimeException("No token provided");
        }

        String email = jwt.extractEmail(token.replace("Bearer ", ""));
        System.out.println("EMAIL: " + email);

        return service.createTask(projectId, email, task);
    }
    // ✅ GET TASKS BY PROJECT
    // @GetMapping("/project")
    // public List<Task> getByProject(@RequestParam Long projectId) {
    //     return service.getByProject(projectId);
    // }

    // ✅ UPDATE STATUS
    @PutMapping("/status")
    public Task updateStatus(
            @RequestParam Long taskId,
            @RequestParam String status
    ) {
        Task task = service.getById(taskId);
        task.setStatus(status);
        return service.save(task);
    }

    @PutMapping("/{id}")
    public Task updateStatus(@PathVariable Long id, @RequestBody Task updated) {

        Task task = service.getById(id);   // ✅ use service

        task.setStatus(updated.getStatus());

        return service.save(task);         // ✅ use service
    }

    @GetMapping
    public List<Task> getTasks(@RequestHeader("Authorization") String token) {

        String email = jwt.extractEmail(token.replace("Bearer ", ""));
        return service.getUserTasks(email);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}