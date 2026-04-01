package com.codingplatform.collabcode.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.codingplatform.collabcode.model.Project;
import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.model.Workspace;
import com.codingplatform.collabcode.repository.ProjectRepository;
import com.codingplatform.collabcode.repository.UserRepository;
import com.codingplatform.collabcode.repository.WorkspaceRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;
    private final WorkspaceRepository workspaceRepo;

    public ProjectService(ProjectRepository projectRepo,
                          UserRepository userRepo,
                          WorkspaceRepository workspaceRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.workspaceRepo = workspaceRepo;
    }

    // ✅ CREATE PROJECT WITH WORKSPACE CONTROL
    public Project saveProject(Project project, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.setOwner(user);
        project.setCreatedAt(LocalDateTime.now());

        if(project.getStatus() == null) {
            project.setStatus("active");
        }

        if(project.getProgress() <= 0) {
            project.setProgress(0);
        }

        List<Workspace> ws = workspaceRepo.findByMembers_id(user.getId());
        if (ws.isEmpty()) {
            throw new RuntimeException("User is not part of any workspace");
        }
        else {
            project.setWorkspace(ws.get(0)); // Assign to the first workspace found
        }
        
        return projectRepo.save(project);
    }

    // ✅ GET PROJECTS (workspace-based)
    public List<Project> getUserProjects(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return projectRepo.findByOwnerId(user.getId());
    }

    public void deleteProject(Long id) {
        projectRepo.deleteById(id);
    }
}