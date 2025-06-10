
# Note Taking App

> A full-stack react + nodejs (Postgresql, Express, React, Node.js) project for note taking.

---

## 📝 Features

- ✅ Backend:
  - RESTful API with Express.js
  - Postgres connection using Prisma
  - Authentication (JWT)
  - Protected endpoints
- ✅ Frontend:
  - Full registration and login flow
  - Full CRUD functionality
  - Drag and Drop functionality

---

## 📦 Technologies Used

| Tech           | Description                        |
|----------------|------------------------------------|
| **Postgresql** | SQL database                       |
| **Express**    | Backend web framework              |
| **React**      | Frontend JavaScript library        |
| **Node.js**    | Runtime environment                |
| **JWT**        | JSON Web Tokens for auth           |
| **Prisma**     | Relational Databases ORM           |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/DevMarioNan/hostel-mate-assessment.git
cd hostel-mate-assessment
```

### 2. Install Dependencies

Install backend and frontend dependencies:

```bash
# Install backend packages
cd server
npm install

# Install frontend packages
cd client
npm install
```

---

## 🔧 Setup Instructions

### 1. Set Up Environment Variables

Create a `.env` file in the server directory:

```env
DATABASE_URL="Your database connection string"
PORT=5000
JWT_SECRET="your JWT secret"
```


---

## 🏃‍♂️ How to Run the App


### Step 1: Run Backend 

Start the Express.js server:

```bash
cd server
npm run dev
```

The server will run at `http://localhost:5000`.

---

### Step 2: Run Frontend 

Start the React application:

```bash
cd client
npm start
```

Runs the React app at `http://localhost:5173`.

