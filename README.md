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

# Steps to SETUP locally
Installation

Clone the repository:

git clone https://github.com/yourusername/notekeeper.git
cd notekeeper

Install dependencies for both frontend and backend:

 #Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

Create a .env file in the backend directory:

envCopyPORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Create a .env.local file in the frontend directory:


VITE_SOCKET_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api

# Running the Application

Start the fronted server:

cd frontend
npm run dev
The application will be available at http://localhost:5173
 
Start the backend development server:

cd backend
npm start
The application will be available at http://localhost:3000


