package com.codingplatform.collabcode.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingplatform.collabcode.model.User;
import com.codingplatform.collabcode.model.Workspace;
import com.codingplatform.collabcode.repository.UserRepository;
import com.codingplatform.collabcode.repository.WorkspaceRepository;

@Service
public class WorkspaceService {

    @Autowired
    private final WorkspaceRepository workspaceRepo;

    @Autowired
    private final UserRepository userRepo;

    public WorkspaceService(WorkspaceRepository workspaceRepo, UserRepository userRepo) {
        this.workspaceRepo = workspaceRepo;
        this.userRepo = userRepo;
    }

    public Workspace createWorkspace(String name, String ownerEmail) {

        User owner = userRepo.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        owner = userRepo.save(owner); // Ensure owner is managed by JPA

        Workspace ws = new Workspace();
        ws.setName(name);
        ws.setOwner(owner);
        ws.setMembers(List.of(owner));

        return workspaceRepo.save(ws);
    }
    
    public Workspace addUserToWorkspace(Long workspaceId, String userEmail) {
        Workspace w = workspaceRepo.findById(workspaceId)
                .orElseThrow(() -> new RuntimeException("Workspace not found"));

        User u = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        w.getMembers().add(u);
        return workspaceRepo.save(w);
    }

    public List<User> getMembers(Long wid) {
        Workspace w = workspaceRepo.findById(wid)
                .orElseThrow(() -> new RuntimeException("Workspace not found"));
        return w.getMembers();
    }
    
    // ✅ NEW
    public List<Workspace> getAll() {
        return workspaceRepo.findAll();
    }

    public Long getWorkspaceIdByEmail(String email) {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Workspace> workspaces = workspaceRepo.findByMembers_id(user.getId());

        if (workspaces.isEmpty()) {
            throw new RuntimeException("No workspace found");
        }

        return workspaces.get(0).getId();
    }
}