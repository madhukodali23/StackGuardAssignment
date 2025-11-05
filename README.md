# 🛡️ StackGuard – Secure Codebase Management App

A full-stack MERN application implementing authentication and navigation flow for **StackGuard**.  
Users can sign up, sign in, verify a public key (between 100–1000 characters), and access a protected dashboard — all styled with a clean UI inspired by the given Figma design.

---

## 🚀 Tech Stack

| Layer | Technologies |
|--------|----------------|
| **Frontend** | React (Vite) • React Router DOM • Fetch API • CSS |
| **Backend** | Node.js • Express.js • MongoDB Atlas • Mongoose • JWT Authentication • Bcrypt |
| **Deployment** | Vercel (Frontend) • Render (Backend) |
| **Extras** | Environment Variables • Protected Routes • User Configuration State |

---

## 🧭 Project Flow

1. **Sign Up / Sign In** – Users register or log in using their email and password.  
   - Input validations included.  
   - After sign-up → redirected to configuration page.

2. **Configuration Page** – User enters a **public key (100–1000 chars)** to simulate secure setup.  
   - Once verified → redirected to dashboard.  
   - Validation handled both client-side and server-side.

3. **Dashboard Page** – Displays a simple welcome message and allows logout.  
   - Accessible only if user is authenticated and configured.  

4. **Protected Routes** – Implemented using custom React class-based logic to guard navigation.

---

## 🖼️ UI Reference

Design closely follows the Figma provided in the task:  
👉 [StackGuard Figma Design](https://www.figma.com/design/ZaJtOkR5AQxfic3cNhgCjN/Untitled?node-id=0-1)

---

## ⚙️ Folder Structure

### Frontend (`client/stackguard-client/`)

```src/
├── api.js
├── auth.js
├── App.jsx
├── main.jsx
├── index.css
├── components/
│ └── ProtectedRoute.jsx
└── pages/
├── AuthPage.jsx
├── ConfigPage.jsx
└── Dashboard.jsx
```


### Backend (`server/`)
```
server/
├── index.js
├── .env
├── models/
│ └── User.js
├── routes/
│ ├── auth.js
│ └── config.js
├── middleware/
│ └── auth.js
└── package.json
```


---

## 🧩 Environment Variables

### 🔹 Backend (`server/.env`)
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=super_secret_change_me
CLIENT_URL=https://stackguard-frontend.vercel.app

## Backend setup
cd stackguard-server
npm install
npm run dev

## Frontend setup
cd stackguard-frontend
npm install
npm run dev


## ✨Features
✅ User Authentication (Sign-in / Sign-up)
🔒 JWT Protected API Routes
🧠 Configurable Public Key (100–1000 characters)
⚡ Responsive UI (Figma-inspired)
🧹 Clean Component Structure
🪶 Pure CSS (no heavy UI libraries)
🚀 Deployed Full-Stack (Vercel + Render)
