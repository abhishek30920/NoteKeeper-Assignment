# Notekeeper

A modern, real-time note-taking application built with React, Node.js, and Socket.IO that allows users to create, manage, and organize their notes with real-time updates.


Features

Real-time note synchronization
User authentication and authorization
Dark/Light theme support
Responsive design
Like/Unlike notes functionality
Secure API with JWT authentication

Technical Stack

Frontend:

React (Create React App)
Zustand for state management <br/>
Socket.IO client for real-time communication <br/>
Tailwind CSS for styling <br/>
React Hook Form with Zod for form validation <br/>
Framer motion for Animation <br/>

Backend:

Node.js with Express <br/>
Socket.IO for real-time updates <br/>
MongoDB for data persistence <br/>
JWT for authentication <br/>
Helmet for security <br/>


Authentication Flow 

![image](https://github.com/user-attachments/assets/503ce735-5a78-4c03-8e89-3ea410f2fbbb)

State Flow

![image](https://github.com/user-attachments/assets/2b72993c-e295-4b10-9fdc-5fb6d92454ac)

API Endpoints
Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Login user

Socket.IO Events

fetchNotes - Get all notes for a user
createNote - Create a new note
updateNote - Update an existing note
deleteNote - Delete a note
likeNote - Like a note
unlikeNote - Unlike a note
