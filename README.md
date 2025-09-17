# 📞 Phone Directory

A full-stack web application for managing a phone directory with JWT authentication, a React UI, and a REST API.

## 🚀 Features

### 🔐 Authentication
- **Sign up**: Create a user account with email and password
- **Login**: Secure authentication with JWT
- **Protected routes**: Auth middleware for sensitive endpoints
- **Password hashing**: Security with bcrypt

### 📱 Contacts Management
- **Full CRUD**: Create, read, update, delete contacts
- **Data isolation**: Each user only sees their own contacts
- **Intuitive UI**: Inline editing, delete confirmation

### 🛠️ Tech Stack

#### Backend
- **Node.js** + **Express.js**: REST API server
- **MongoDB** + **Mongoose**: NoSQL database
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Swagger**: Interactive API documentation
- **CORS**: Cross-origin request handling

#### Frontend
- **React**: User interface
- **React Router**: Page navigation
- **Axios**: HTTP requests to the API

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Setup

### 1. Clone the project
```bash
git clone <repository-url>
cd phone-directory
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
MONGODB_URI=mongodb://localhost:27017/phone-directory
JWT_SECRET=your_very_secure_jwt_secret_here
```
```
Create a `.env` file in the `front-end` folder:

REACT_APP_API_URL=http://localhost:5000
```

### 3. Frontend setup
```bash
cd front-end
npm install
```

### 4. Run the application

#### Terminal 1 - Backend
```bash
cd server
npm start
# or for development
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd front-end
npm start
```

## 🌐 Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger documentation**: http://localhost:5000/api-docs

## 📚 API - Endpoints (Swagger)

All endpoints are documented and testable via Swagger UI: `http://localhost:5000/api-docs`.

### Auth
- `POST /auth/register` — Register
- `POST /auth/login` — Login (returns a JWT `token`)

### Contacts (secured — Bearer Token required)
- `GET /contacts` — Get all contacts for the authenticated user
- `POST /contacts` — Create a contact
- `PATCH /contacts/{id}` — Partially update a contact
- `DELETE /contacts/{id}` — Delete a contact

### Users (secured — Bearer Token required)
- `GET /users/email/{email}` — Get a user by email

## 🔒 Security

- **JWT tokens**: Stateless authentication
- **bcrypt hashing**: Secure passwords
- **Configured CORS**: Protects against malicious cross-origin requests
- **Data validation**: Client and server-side checks
- **Data isolation**: Users can only access their own data

## 👨‍💻 Author
Me ✨.