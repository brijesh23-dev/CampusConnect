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
Open `.env` and fill in the values below. These names match the app configuration in `backend/src/config/config.js`.

| Variable | Description |
|---|---|
| `PORT` | Backend port to run the API on. Default: `5000` |
| `DB_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string for JWT signing |
| `JWT_EXPIRES_IN` | JWT lifetime, usually `7d` |
| `SALT_ROUNDS` | bcrypt salt rounds, usually `10` |
| `FRONTEND_URL` | Frontend origin for CORS, e.g. `http://localhost:5173` |
| `NODE_ENV` | Set to `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

For production hosting, set the frontend build to the deployed backend URL, for example:
```env
VITE_API_URL=https://api.your-domain.com/api
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

- `DB_URI` — Atlas connection string
- `JWT_SECRET` — strong random value (different from dev)
- `FRONTEND_URL` — your deployed frontend URL
- `NODE_ENV=production`
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — image upload config
- `PORT` — the port your host expects for the API server

---

## 7. Checklist Before Going Live

- [ ] `NODE_ENV=production` set on server
- [ ] `JWT_SECRET` is a long, unique random string
- [ ] CORS `FRONTEND_URL` matches the deployed frontend domain
- [ ] MongoDB Atlas IP whitelist includes server IP (or `0.0.0.0/0` with auth)
- [ ] `npm run build` passes with zero errors
- [ ] Admin account created in production DB
- [ ] HTTPS enabled on both frontend and backend origins
- [ ] `frontend/.env` and `backend/.env` are not committed to version control
