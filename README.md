# 💬 CoreChat
**CoreChat** is a full-stack, real-time chat application built with the **MERN** stack (MongoDB, Express.js, React/Next.js, Node.js). This is a solo-project designed to explore and learn frontend/backend(full-stack)systems, authentication, WebSocket communication, secure REST APIs, and overall a full-stack product development.
The goal is to create a robust, secure, and feature-rich messaging platform, starting with core features and scaling up to incorporate modern tools and technologies in future.

---

## Features

* **User Authentication** – Secure JWT-based login and registration for robust user management.
* **One-on-One Messaging** – Direct, private messaging between individual users.
* **Group Chat Support** – Create and manage dynamic group chats with multiple participants.
* **Protected Routes** – Implemented authentication middleware for comprehensive API protection.
* **MongoDB Integration** – All data is securely stored and managed using Mongoose schemas.
* **Real-time Messaging** – Built with Socket.IO for live, instant communication.
* **Clean Architecture** – Features a modular file structure adhering to best practices for maintainability.
* **RESTful APIs** – Provides well-structured endpoints for chat, user, and message operations.
* **Testable Backend** – Thoroughly tested via Postman and MongoDB Compass to ensure reliability.
* **Professional UI** – A clean and minimal React interface designed for optimal user experience.
* **MERN Stack** – Developed using the powerful MongoDB, Express, React, and Node.js stack.
---

## Tech Stack

* **Frontend**: React.js, Next.js, TailwindCSS/shadcn (minimal and professional design)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose ODM)
* **Authentication**: JWT + Bcrypt
* **Real-time Communication**: Socket.IO
* **Testing & Tools**: Postman, MongoDB Compass
* **Version Control**: Git + GitHub

---
## Project Development & Progress Phases 

### CoreChat v1.0.0 – MVP (Minimum Viable Product)

* [x]   Setup project repository and structure (backend + frontend)
* [x]   Implement MongoDB database connection
* [x]   Setup user authentication (JWT + bcrypt)
* [x]   Develop User, Chat, and Message models
* [x]   Create RESTful routes for user, chat, and message
* [x]   Add basic error handling and status codes
* [x]   Simple, clean frontend with login/register and chat UI
* [ ]   Frontend and backend Integration
* [ ]   Integrate real-time chat with Socket.IO

---

### CoreChat v2.0.0 – Enhanced Functionality

* [ ]   Add group chat creation and management
* [ ]   Add user search with debounce
* [ ]   Message read/unread status
* [ ]   UI notifications for new messages
* [ ]   Refine UI/UX with minimal design improvements
* [ ]   Add loading skeletons and async states
* [ ]   Message timestamps and formatting
* [ ]   Chat member controls (add/remove users)
* [ ]   Refactor for better modularity and error handling

---

### CoreChat v3.0.0 – Advanced & Scalable

* [ ]   Implement real-time group chat using Socket.IO
* [ ]  Enable file/image sharing in chat
* [ ]  Add typing indicators
* [ ]  Add online/offline presence indicators
* [ ]  Add emoji support
* [ ]  Dark mode toggle
* [ ]  Add rate-limiting and input sanitization
* [ ]  Admin moderation features (block/report)
* [ ]  Message pinning and starring
* [ ]  Archive and delete chat features, implement checkbox logic

---

---
## Future Enhancements

* [ ]   **End-to-End Encryption** – Ensure secure messaging through encrypted communication.
* [ ]   **QR Code-Based User Sharing** – Easily share user profiles or group invites via scannable QR codes.
* [ ]   **WebRTC Video/Audio Calls** – Enable real-time video and audio communication between users.
* [ ]   **AI Chatbot Assistant** – Integrate intelligent chat assistant using AI SDKs or APIs.
* [ ]   **Email Notifications** – Notify users about mentions, unread messages, or missed chats.
* [ ]   **AI/ML-Based Suggestions** – Smart reply generation, message categorization, and user recommendation features.
---

---
## Getting Started (Local Setup & Run)
```bash
git clone https://github.com/aadarKdk/CoreChat.git
cd CoreChat

# Open backend & install backend dependencies
cd backend
npm install

# Start backend server
npm run dev

# In new terminal: Open frontend & install frontend dependencies
cd ../frontend
npm install

# Start frontend
npm run dev
```
---
