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

Clone the repository:  <br/>

git clone https://github.com/yourusername/notekeeper.git  <br/>
cd notekeeper  <br/>

Install dependencies for both frontend and backend:

# Install backend dependencies
cd backend <br/>
npm install  <br/>

# Install frontend dependencies
cd frontend  <br/>
npm install   <br/>

Create a .env file in the backend directory:

envCopyPORT=5000  <br/>
MONGODB_URI=your_mongodb_uri  <br/>
JWT_SECRET=your_jwt_secret  <br/>
CLIENT_URL=http://localhost:3000  <br/>

Create a .env.local file in the frontend directory:  <br/>


VITE_SOCKET_URL=http://localhost:3000  <br/>
VITE_API_URL=http://localhost:3000/api  <br/>

# Running the Application

Start the fronted server:

cd frontend  <br/>
npm run dev  <br/>
The application will be available at http://localhost:5173  <br/>
 
Start the backend development server:  <br/>

cd backend  <br/>
npm start  <br/>
The application will be available at http://localhost:3000  <br/>


# Project Setup Using Docker

This guide will help you set up and run the frontend and backend of the project using Docker and Docker Compose.

Prerequisites  <br/>

Make sure you have the following installed: <br/>

Docker  <br/>

Docker Compose  <br/>

1️⃣ Setting Up Environment Variables  <br/>

# Backend  <br/>

Create a .env file inside the backend folder and update the MongoDB URI:

MONGO_URI=mongodb://host.docker.internal:27017/notebook  <br/>
PORT=3000  <br/>
JWT_SECRET=your_secret_key  <br/>
JWT_EXPIRATION=24h  <br/>
CLIENT_URL=http://localhost:5000  <br/>

#Frontend

Create a .env file inside the frontend folder:  <br/>
 
VITE_SOCKET_URL=http://localhost:3000  <br/>
VITE_API_URL=http://localhost:3000/api  <br/>

2️⃣ Running the Project with Docker Compose  <br/>

Step 1: Build and Start Services  <br/>

Run the following command in the project root directory:  <br/>

docker-compose up --build  <br/>

Step 2: Access the Services  <br/>

Backend: http://localhost:3000  <br/>

Frontend: http://localhost:5000  <br/>

MongoDB: Connect to mongodb://host.docker.internal:27017/notebook  <br/>

Step 3: Stop the Services  <br/>

To stop all containers, run:  <br/>

docker-compose down  <br/>

3️⃣ Troubleshooting  <br/>

MongoDB Connection Issues <br/>

Make sure MongoDB is running (docker ps to check)  <br/>

Ensure the .env file contains MONGO_URI=mongodb://host.docker.internal:27017/notebook  <br/>

Port Conflicts  <br/>

If ports 5000 or 3000 are in use, change them in docker-compose.yml and .env.  <br/>

