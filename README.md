# 💬 CoreChat
**CoreChat** is a full-stack, real-time chat application built with the **MERN** stack (MongoDB, Express.js, React/Next.js, Node.js). This is a solo-project designed to explore and learn frontend/backend systems, authentication, WebSocket communication, secure REST APIs, and overall a full-stack product development.

The goal is to create a robust, secure, and feature-rich messaging platform, starting with core features and scaling up to incorporate modern tools and technologies in future.

---
## Table of Contents
- Tech Stack
- Project Phases & Progress
- Testing Strategy
- Getting Started (Local Setup)
- Future Enhancements
- Deployment Plan
---
---
## Tech Stack
### Frontend
-  **TypeScript**
-  **Next.js** ---> (React-based framework: handles routing itself)
-  **Tailwind CSS** + **Shadcn/UI** ---> (Styling and UI)
-  **Redux Toolkit** ---> (State management)
-  **Axios** (API integration)
- **Socket.IO Client** ---> (Real-time communication)
-  **Formik + Yup** ---> (Forms + validation)
###  Backend
-  **Node.js** + **Express.js**  ---> (REST APIs)
-  **MongoDB** + **Mongoose**   ---> (NoSQL database)
-  **JWT** + **bcrypt** ---> (Secure authentication)
-  **Socket.IO**  ---> (Real-time message transport)
-  **Multer** ---> (File/media upload)
-  **Helmet, dotenv, cors** ---> (Security and environment management)
---

---
### Dev Tools
-    **Visual Studio Code** ---> (IDE)
-    **Git/GitHub**  ---> (VCS)
-    **MongoDB Compass** ---> (MongoDB GUI)
-    **Postman** ---> (Manual API Testing)
---

---
## Project Phases & Progress

### Phase 1:  Project Initialization & Setup
**Goal**: Establish project scaffolding and ensure a working development environment.

- [x]   Initialize project, Git/GitHub, `npm`, `.gitignore`, Folders
**Backend**
- [ ]   Setup Express server
- [ ]   MongoDB connection with Mongoose
- [ ]   Setup environment config `.env` using dotenv
- [ ]   Add health-check route `(/api/ping)`
- [ ]   Test DB with MongoDB Compass
- [ ]   Test API with Postman `(/api/ping)`

**Frontend**
- [x]   Initialize Next.js with TypeScript
- [ ]   Configure Tailwind CSS + shadcn/ui
- [ ]   Define folder and page structure
- [ ] Implement basic layout (header, footer, navigation placeholder)

---
### Phase 2: User Authentication (JWT)
**Goal**: Implement secure user registration and login using JWT tokens.

**Backend**
- [ ]   `User` model with hashed password (bcrypt)
- [ ]    Register & login APIs
- [ ]    Login route (JWT return)
- [ ]    JWT authentication middleware
- [ ]    Protected route test

**Frontend**
- [ ]   Auth login & register forms (Formik + Yup)
- [ ]   Axios integration for Auth API
- [ ]   Implement secure token storage (e.g., HTTP-only cookies for JWT)
- [ ]   Implement authentication context or Redux slice for user state

---
### Phase 3: One-to-One Messaging (REST)
**Goal**: Enable basic personal messaging via REST APIs.

**Backend**
- [ ]   `Chat` model: user1, user2, isGroup
- [ ]   `Message` model: sender, content, chatRef
- [ ]   Create or get chat API
- [ ]   Send message API
- [ ]   Fetch chat list API
- [ ]    Fetch Messages API
- [ ]   Implement pagination for fetching messages (Routes: create chat, send message, get messages)

**Frontend**
- [ ]   Chat UI and layout
- [ ]   Messaging area UI (Message input component, chat list, message rendering component)
- [ ]   Message fetch/send/updates logic using Axios

---
### Phase 4: Real-time Messaging (Socket.IO)
**Goal**: Add real-time communication using Socket.IO with typing indicators.

**Backend**
- [ ]   Setup Socket.IO server
- [ ]   Integrate Socket.IO with JWT for authenticated connections
- [ ]   Handle user connection/disconnection events
- [ ]   Implement logic to Join chat rooms
- [ ]   Broadcast real-time messages to chat participants
- [ ]   Implement typing indicator events(emit/listen)

**Frontend**
- [ ]   Setup and Connect to Socket.IO client
- [ ]   Real-time message updates (display new messages as they arrive)
- [ ]   Display Typing indicator UX

---
### Phase 5: Group Chat Support
**Goal**: Allow creation of group chats and user management.
**Backend**
- [ ]    Extend Chat model for groups (admin, members)
- [ ]   Create group chat API 
- [ ]   Add/remove/rename members group API 
- [ ]   Group rename, leave group APIs

**Frontend**
- [ ]   UI for Group chat creation form
- [ ]   Member management UI (Add/remove members)
- [ ]   Switch between group/personal chats in UI


---
###  Phase 6: User Profile & Media Sharing
**Goal**: Add user personalization and chat file upload support.

**Backend**
- [ ]   Extend User schema/model (avatar, bio)
- [ ]   Profile update API
- [ ]   Multer-based media upload in chat (eg. Images, documents)

**Frontend**
- [ ]   Profile update form (Avatar upload, bio field)
- [ ]   Image/file Upload
- [ ]   preview media in chat

---
### Phase 7: Notifications & Admin
**Goal**: Alert users of new messages and support basic moderation.

**Backend**
- [ ]   Notification schema
- [ ]   Emit “new message” notification (via Socket.IO)
- [ ]   Mark notification as seen API
- [ ]   Implement Admin role (e.g., a field in User model)
- [ ]   Admin routes: user list, delete initialize frontend with Next.js (TypeScript)users/chats

**Frontend**
- [ ]    Notification badge (e.g., for unread messages)
- [ ]    Minimal Admin dashboard UI (e.g., user list, actions)
---

---
## Testing Strategy

| Tool        | Use Case               |
| ----------- | ---------------------- |
| Postman     | Manual API testing     |
| Compass     | MongoDB inspection     |
| Jest        | Unit testing (backend) |
| Supertest   | API integration tests  |

---

## Getting Started (Local Setup)
## Future Enhancements
## Deployment Plan