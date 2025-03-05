```markdown
# NestJS Auth API & Next.js Client in NX Monorepo

This repository implements a secure authentication system using a NestJS backend integrated with MongoDB via Prisma and a Next.js frontend for the client interface. The application uses JWTs stored in HTTP‑only cookies for secure session management and includes endpoints for signing up, signing in, logging out, and accessing protected routes.

This project is managed within an NX monorepo.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Prisma Configuration](#prisma-configuration)
- [Frontend Details](#frontend-details)
- [Additional Configuration](#additional-configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project consists of two parts:

1. **Backend**: A NestJS API using Prisma to connect to a MongoDB database. It provides:
   - User sign-up and sign-in endpoints.
   - JWT-based authentication with tokens stored as HTTP‑only cookies.
   - A protected endpoint (`/app/welcome`) that returns a welcome message.
   - Global validation, logging, rate throttling, CORS configuration, and Swagger integration for API documentation.

2. **Frontend**: A Next.js application that includes:
   - Sign-up and sign-in forms.
   - A welcome page that fetches protected data from the backend.
   - A responsive Navbar that reflects the user’s authentication status.

## Features

- **User Authentication**: Secure sign-up and sign-in endpoints.
- **HTTP‑Only Cookies**: JWT tokens are stored in secure, HTTP‑only cookies.
- **Protected Routes**: Routes accessible only to authenticated users.
- **Global Validation & Security**: Validation pipes, CORS, and throttling.
- **Swagger API Documentation**: Interactive documentation with detailed examples.
- **NX Monorepo Setup**: Organized project structure with shared libraries.
- **Prisma Integration**: Database ORM with defined NX targets for migrations and client generation.
- **Next.js Frontend**: A modern React-based UI with secure authentication flow.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (or yarn)
- A MongoDB instance (local or Atlas)
- [NX CLI](https://nx.dev/latest/angular/getting-started/intro) (optional, for monorepo management)
- [NestJS CLI](https://docs.nestjs.com/cli/overview) (optional, for development)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AhmedNewiry/fullstack-task.git
   cd fullstack-task
   ```

2. **Install Dependencies**

   In the root of the NX monorepo, install dependencies using:

   ```bash
   npm i --legacy-peer-deps
   ```

   This flag helps resolve any peer dependency conflicts common in a monorepo setup.

## Environment Variables

A sample `.env.example` file is provided in the repository root. Copy it to create your own `.env` file:

```bash
cp .env.example .env
```

Then, update the values in your new `.env` and you can just run the app using these env variables.


Another option is to create a `.env` file in the root of the repository with the following variables:

```dotenv
# MongoDB connection string (MongoDB Atlas URI or local instance)
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority"

# JWT secret key
JWT_SECRET="your_jwt_secret"

# Application port
PORT=3000

# Comma-separated list of allowed origins (e.g., your frontend URL)
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:4200"

# For the Next.js client, set the API URL:
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Running the Application

### Backend

1. **Generate Prisma Client**

   Run the following NX target to generate the Prisma client:

   ```bash
   nx run prisma:generate-orm
   ```

2. **Push Prisma Schema Changes**

   Use the following NX target to push your Prisma schema to the database (this does not use migrations):

   ```bash
   nx run prisma:migrate-orm
   ```

3. **Start the Backend Server**

   Start the NestJS backend server (from the root of the monorepo):

   ```bash
   nx serve backend
   ```

   The server will run on the port defined in your `.env` (default is 3000).  
   Swagger documentation is available at:  
   `http://localhost:3000/api-docs`

### Frontend

1. **Start the Frontend**

   If the Next.js client is part of the monorepo, navigate to its directory (if applicable) and run:

   ```bash
   nx serve frontend
   ```

   Ensure that the `NEXT_PUBLIC_API_URL` environment variable is set appropriately (e.g., `http://localhost:3000`).

## API Endpoints

### Authentication Endpoints

- **Sign Up:**  
  `POST /auth/signup`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "Password@123"
    }
    ```
  - **Response:**
    ```json
    { "message": "User created successfully." }
    ```

- **Sign In:**  
  `POST /auth/signin`
  - **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "Password@123"
    }
    ```
  - **Response:**  
    Sets an HTTP‑only cookie named `access_token` and returns:
    ```json
    { "message": "Signin successful" }
    ```

- **Logout:**  
  `POST /auth/logout`
  - **Response:**
    ```json
    { "message": "Logged out successfully." }
    ```

### Protected Endpoint

- **Welcome Message:**  
  `GET /app/welcome`
  - **Response:**
    ```json
    { "message": "Welcome to the application." }
    ```
  - **Note:** Requires a valid HTTP‑only JWT cookie.

## Swagger Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

### Testing Cookie‑Based Authentication in Swagger

1. **Sign In First:**  
   Use the `/auth/signin` endpoint in Swagger (or via another client like Postman) to log in. This will set the HTTP‑only cookie (`access_token`) in your browser.

2. **Access Protected Routes:**  
   After signing in, your browser automatically includes the cookie when making requests to protected endpoints.  
   **Note:** HTTP‑only cookies are not visible or editable in Swagger UI, so for a more hands‑on testing experience, consider using Postman or similar tools.

### Security Scheme

The Swagger configuration has been adjusted to document cookie‑based authentication. A security scheme (`cookieAuth`) has been defined so that endpoints requiring authentication show the proper configuration.

## Prisma Configuration

Prisma is set up as a library under `libs/prisma/` in this NX monorepo. The project includes the following NX targets:

- **migrate-orm:**  
  Executes the command:
  ```bash
  npx prisma db push --schema=libs/prisma/prisma/schema.prisma
  ```
  This command pushes your schema changes to the database without using migrations.

- **generate-orm:**  
  Executes the command:
  ```bash
  npx prisma generate --schema=libs/prisma/prisma/schema.prisma
  ```
  This command generates the Prisma client based on your schema.

You can run these targets using:

```bash
# Push schema changes to the database
nx run prisma:migrate-orm

# Generate the Prisma client
nx run prisma:generate-orm
```

## Frontend Details

- **Sign In/Sign Up Pages:**  
  Implemented using `react-hook-form` for form validation. API calls are made using Axios with `withCredentials: true` to ensure HTTP‑only cookies are included.

- **Navbar:**  
  Displays navigation options based on the user’s authentication status. The authentication status is determined by checking with a backend endpoint (e.g., `/auth/me`) which is the required protected endpoint rather than using local storage.

- **Welcome Page:**  
  Fetches and displays a welcome message from  `/app/welcome` endpoint.

## Additional Configuration

- **Global Validation:**  
  Validation pipes are applied globally to enforce DTO validation.

- **CORS:**  
  Configured to allow origins specified in the `ALLOWED_ORIGINS` environment variable. Credentials are enabled so cookies are sent with cross-origin requests.

- **Cookie Parser:**  
  Middleware is applied to parse HTTP‑only cookies for JWT extraction in the authentication process.

- **Swagger Customization:**  
  Swagger documentation includes details on cookie‑based authentication and provides example values for request bodies.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or issues, please contact [ahmedabdalfttah@outlook.com](mailto:your-email@example.com).

