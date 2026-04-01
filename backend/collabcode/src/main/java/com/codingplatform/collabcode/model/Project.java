package com.codingplatform.collabcode.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description; 
    private String status;
    private int progress;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User owner;   // 🔥 ADD THIS (IMPORTANT)

    @ManyToOne
    private Workspace workspace;  // 🔥 ADD THIS (IMPORTANT)

    public void setCreatedAt(LocalDateTime now) {
        this.createdAt = now;   // ✅ FIXED
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getOwner() {
        return owner;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getProgress() {
        return progress;
    }

    @SuppressWarnings("unused")
    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}