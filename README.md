# 🚀 NiyamX – Mini Jira Project Management App

## 📌 Overview

NiyamX is a full-stack **Mini Jira-like project management application** that allows users to manage projects, track tasks, and monitor progress through an intuitive dashboard.

This project demonstrates real-world full-stack development using modern technologies, including authentication, REST APIs, and deployment.

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Secure API access using Authorization headers

### 📁 Project Management

* Create and manage projects
* Associate tasks with projects
* Delete projects

### ✅ Task Management

* Create tasks with status:

  * TODO
  * IN_PROGRESS
  * DONE
* Update task status
* Delete completed tasks

### 📊 Dashboard & Analytics

* Project progress visualization (Bar Chart)
* Task distribution (Pie Chart)
* Real-time stats (Completed, In Progress, etc.)

### 🎨 UI/UX

* Modern responsive UI using Tailwind CSS
* Dark theme interface
* Interactive charts using Recharts
* Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* Recharts

### Backend

* Spring Boot (Java 21)
* Spring Security
* JWT Authentication (custom filter)
* REST APIs

### Database

* PostgreSQL (Supabase)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 🌐 Live Demo

* 🔗 Frontend: https://niyam-x-web-app.vercel.app
* 🔗 Backend: https://niyamx-backend-rsab.onrender.com

---

## ⚙️ Setup Instructions

### 🔧 Frontend Setup

```bash
git clone <your-repo-url>
cd frontend
npm install
npm run dev
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8080
```

---

### 🔧 Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

Configure `application.properties`:

```properties
spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
```

---

## 🚀 Deployment Challenges & Learnings

During deployment, several real-world issues were encountered and resolved:

* ✅ Fixed CORS issues between frontend and backend
* ✅ Implemented proper JWT authentication handling
* ✅ Fixed React Router refresh issue using `vercel.json`
* ✅ Solved MIME type errors due to incorrect routing
* ✅ Debugged production vs localhost behavior differences

---

## 🔐 Security Notes

* JWT tokens are stored in localStorage (for simplicity)
* Authorization headers are automatically attached via Axios interceptors
* Logging sensitive data (like tokens) is avoided in production

---

## 📈 Future Improvements

* Refresh token implementation
* Role-based access control (Admin/User)
* Notifications & real-time updates
* Soft delete for users and data safety

---

## ⭐ Acknowledgements

* Inspired by Jira-style workflow systems
* Built as a full-stack learning and portfolio project

---

## 📌 Conclusion

This project showcases end-to-end development:

* Frontend + Backend integration
* Authentication & Security
* Drag-Drop tasks in (TO-DO, IN-PROGRESS, COMPLET)
* Deployment & Debugging
* Real-world problem solving

---
