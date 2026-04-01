package com.codingplatform.collabcode.service;

import org.springframework.stereotype.Service;

import com.codingplatform.collabcode.model.Project;
import com.codingplatform.collabcode.model.Task;
import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.repository.ProjectRepository;
import com.codingplatform.collabcode.repository.TaskRepository;
import com.codingplatform.collabcode.repository.UserRepository;

import java.util.List;
import java.time.LocalDate;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository taskRepo,
                       ProjectRepository projectRepo,
                       UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    // ✅ CREATE TASK (SECURE)
    public Task createTask(Long projectId, String email, Task task) {

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setProject(project);
        task.setAssignedTo(user);

        if(task.getStatus() == null || task.getStatus().isEmpty()) {
            task.setStatus("To Do");
        }

        if(task.getPriority() == null || task.getPriority().isEmpty()) {
            task.setPriority("Medium");
        }

        if(task.getDeadline() == null) {
           task.setDeadline(LocalDate.now().plusDays(7)); // Default deadline 1 week from now
        }

        return taskRepo.save(task);
    }

    public Task getById(Long id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task save(Task task) {
        return taskRepo.save(task);
    }

    public List<Task> getUserTasks(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepo.findByProjectOwnerId(user.getId());
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    private void d() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}