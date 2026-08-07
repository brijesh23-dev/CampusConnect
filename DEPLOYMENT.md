# CampusConnect — Deployment Guide

## Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- npm ≥ 9

---

## 1. Clone & Install

```bash
git clone <repo-url>
cd CampusConnect

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

---

## 2. Environment Configuration

### Backend
```bash
cd backend
cp .env.example .env
```
Open `.env` and fill in:

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret for JWT signing |
| `CLIENT_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |
| `NODE_ENV` | `development` or `production` |

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Running Locally

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev        # nodemon, port 5000

# Terminal 2 — Frontend
cd frontend
npm run dev        # Vite, port 5173
```

Visit: **http://localhost:5173**

---

## 4. Seed an Admin Account

Connect to MongoDB and insert directly (no registration UI for admin):

```js
// mongo shell or MongoDB Compass > campusconnect > users
db.users.insertOne({
  name: "Admin",
  email: "admin@campus.edu",
  password: "<bcrypt hash of your password>",  // use bcrypt.hashSync('yourpassword', 10)
  role: "admin"
})
```

Or run a one-off seed script:
```bash
cd backend
node -e "
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('./src/models/user.model');
  await User.create({ name:'Admin', email:'admin@campus.edu', password: bcrypt.hashSync('admin123', 10), role:'admin' });
  console.log('Admin created'); process.exit();
});
"
```

---

## 5. Production Build

```bash
cd frontend
npm run build          # outputs to frontend/dist/

# Serve dist/ with any static host (Vercel, Netlify, S3+CloudFront)
# OR via Express:
# app.use(express.static(path.join(__dirname, '../../frontend/dist')));
```

### Recommended Stack
| Layer | Option |
|---|---|
| Frontend | Vercel / Netlify |
| Backend API | Railway / Render / EC2 |
| Database | MongoDB Atlas (free tier for dev) |

---

## 6. Environment Variables for Production

Set these in your hosting dashboard (never commit `.env` to git):

- `MONGO_URI` — Atlas connection string
- `JWT_SECRET` — strong random value (different from dev)
- `CLIENT_URL` — your deployed frontend URL
- `NODE_ENV=production`

---

## 7. Checklist Before Going Live

- [ ] `NODE_ENV=production` set on server
- [ ] `JWT_SECRET` is a long, unique random string
- [ ] CORS `CLIENT_URL` matches deployed frontend domain
- [ ] MongoDB Atlas IP whitelist includes server IP (or `0.0.0.0/0` with auth)
- [ ] `npm run build` passes with zero errors
- [ ] Admin account created in production DB
- [ ] HTTPS enabled on both frontend and backend origins
