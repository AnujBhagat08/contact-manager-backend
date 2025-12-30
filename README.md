
# Contact Manager Backend API

A secure and scalable RESTful API for managing personal and professional contacts, built with **Node.js**, **Express**, and **MongoDB Atlas**.  
It follows modern backend engineering standards with JWT authentication, clean modular architecture, and production-ready practices. 

---

## Overview

Contact Manager Backend exposes a set of RESTful endpoints that allow clients to register users, authenticate via JWT, and perform full CRUD operations on contacts. 
It is suitable as a backend for portfolio projects, production-ready contact management apps, or as a learning reference for Node.js API development.

---

## Features

- **Secure user registration and login** with email and password.
- **Password hashing** using `bcryptjs` before persisting users to MongoDB. 
- **JWT-based authentication and authorization** for protected routes.
- **Protected contact endpoints** accessible only to authenticated users. 
- **Full CRUD for contacts**: create, read, update, and delete. 
- **Search and filtering** contacts by name or email via query parameters.  
- **Centralized error handling** for consistent API responses. 
- **CORS-enabled** to allow integration with frontend applications.  
- **Environment-based configuration** using `dotenv`. 

---

## Tech Stack

- **Runtime:** Node.js (ES Modules, v22.x)
- **Framework:** Express.js (v5.x)
- **Database:** MongoDB Atlas with Mongoose ODM
- **Auth:** JSON Web Token (JWT)
- **Security & Utils:** bcryptjs, dotenv, CORS
- **Version Control:** Git
- **Hosting/Deployment:** Render

---

## Architecture & Folder Structure

The project follows a modular structure separating concerns into controllers, routes, models, and middleware.  

```
contact-manager-backend/
│
├── Controllers/
│   ├── userController.js       # Auth & user-related logic
│   └── contactController.js    # Contact CRUD logic
│
├── Models/
│   ├── User.js                 # User schema & model
│   └── Contact.js              # Contact schema & model
│
├── Routes/
│   ├── userRoutes.js           # /api/user routes
│   └── contactRoutes.js        # /api/contact routes
│
├── Middleware/
│   └── authMiddleware.js       # JWT auth verification
│
├── server.js                   # App entry point & Express setup
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher installed locally. 
- MongoDB Atlas account (or local MongoDB instance).  
- Git for cloning the repository.

### Installation

```
# 1. Clone the repository
git clone https://github.com/AnujBhagat08/contact-manager-backend.git

# 2. Change into project directory
cd contact-manager-backend

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

- `PORT`: Port on which the server will run.
- `MONGO_URL`: MongoDB Atlas or local connection string.
- `JWT_SECRET`: Secret key used to sign JWTs (keep this private).
- `JWT_EXPIRES_IN`: Token expiry duration (e.g., `7d`).
- `BCRYPT_SALT_ROUNDS`: Number of salt rounds for password hashing. 

> **Note:** Do **not** commit `.env` to version control.

### Running the Server

```
# Development
npm start
```

The server will be available at:

```
http://localhost:3000
```

---

## API Documentation

All responses are returned as JSON. 
Protected endpoints require a valid JWT sent via the `Authorization` header in the format: `Bearer <token>`.

### Authentication

#### Register User

- **Method:** `POST`  
- **Endpoint:** `/api/user/register`

**Request Body:**

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

**Successful Response Example:**

```
{
  "success": true,
  "message": "User registered successfully"
}
```

---

#### Login User

- **Method:** `POST`  
- **Endpoint:** `/api/user/login`

**Request Body:**

```
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

**Successful Response Example:**

```
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

Use the returned `token` in the `Authorization` header:

```
Authorization: Bearer jwt_token_here
```

---

### Contacts

All contact routes are **protected** and require a valid JWT. 

#### Get All Contacts

- **Method:** `GET`  
- **Endpoint:** `/api/contact`

**Query Parameters (optional):**

- `search`: Filter by name or email (see [Search](#search)).

**Sample Request:**

```
GET /api/contact
Authorization: Bearer jwt_token_here
```

---

#### Create Contact

- **Method:** `POST`  
- **Endpoint:** `/api/contact`

**Request Body:**

```
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91-9876543210"
}
```

---

#### Update Contact

- **Method:** `PUT`  
- **Endpoint:** `/api/contact/:id`

**Request Body (partial or full):**

```
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

#### Delete Contact

- **Method:** `DELETE`  
- **Endpoint:** `/api/contact/:id`

**Sample Request:**

```
DELETE /api/contact/665f1b7c1f0a3c4c6f1b2a99
Authorization: Bearer jwt_token_here
```

---

### Search

You can search contacts by name or email using the `search` query parameter. 

- **Method:** `GET`  
- **Endpoint:** `/api/contact?search=john`

The backend performs case-insensitive matching on name and email fields. 

---

## Security Practices

This project includes common API security best practices. 

- **Password hashing:** User passwords are hashed using `bcryptjs` before being stored in the database. 
- **JWT protection:** All contact-related endpoints are protected with JWT-based authentication. 
- **Data minimization:** Sensitive fields (e.g., password hashes) are never returned in API responses. 
- **Environment variables:** Secrets like `JWT_SECRET` and `MONGO_URL` are loaded from `.env`, keeping them out of the codebase. 
- **CORS configuration:** CORS is enabled and can be configured to only allow trusted frontend origins. 

---

## Deployment

The backend is designed to be easily deployed to platforms like **Render** or similar Node.js hosting providers.

Typical deployment steps:

- Set environment variables (`MONGO_URL`, `JWT_SECRET`, etc.) in the hosting dashboard.
- Configure the build/start command, e.g. `npm install && npm start`. 
- Ensure that your frontend uses the deployed API base URL instead of `localhost`.

---

## License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it with proper attribution.

---

## Author

**Anuj Bhagat**  
Full-Stack Developer (Backend Focus)

- GitHub: [https://github.com/AnujBhagat08](https://github.com/AnujBhagat08)
- Interests: Backend architecture, RESTful API design, authentication & authorization, databases, and data modeling.

This project was built as a hands-on learning initiative to design and implement a secure, scalable, and production-ready backend system using modern web technologies.
