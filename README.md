# CampusConnect

CampusConnect is a full-stack campus engagement platform designed for university communities. It helps students discover events, register for activities, and track their interests, while clubs and administrators can create, manage, review, and approve events.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Material UI, React Router
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT with HTTP-only cookies
- Real-time updates: Socket.IO
- Media: Cloudinary
- Validation: Joi

## Core Features

- Role-based access for student, club, and admin users
- Secure registration and login flow
- Club profile management and public club listing
- Event creation, updates, approvals, and filtering
- Student registration and participation tracking
- Notification system for relevant activity updates
- Admin analytics and moderation tools
- Real-time socket-based communication for live updates

## Role Overview

### Student
- Browse public events
- Register for events
- Update personal interests
- View personal dashboard and notifications

### Club
- Manage club profile
- Create and update event listings
- View club-specific analytics and participants
- Handle notification activity

### Admin
- Manage users and roles
- Approve or remove events
- Access platform-wide analytics and moderation tools

## Project Structure

```text
CampusConnect/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── validations/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── README.md
├── DEPLOYMENT.md
├── PROGRESS.md
└── package.json (if present in repo root)
```

## Prerequisites

Before starting the project, make sure you have:

- Node.js 18 or newer
- npm or yarn
- MongoDB running locally or access to a MongoDB Atlas cluster
- A Cloudinary account for media upload support

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following values:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
SALT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the backend in development mode:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

4. Start the Vite development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

## Common API Routes

The backend exposes the app under the `/api` prefix.

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/getme`

### Events

- `GET /api/events/all`
- `GET /api/events/:id`
- `POST /api/events/create`
- `PUT /api/events/update/:id`
- `DELETE /api/events/delete/:id`
- `GET /api/events/my-events`
- `PATCH /api/events/:id/approve`

### Users and Interests

- `PUT /api/users/profile`
- `PUT /api/users/password`
- `PUT /api/users/interests`

### Clubs

- `GET /api/clubs/all`
- `GET /api/clubs/profile`
- `PUT /api/clubs/profile`
- `GET /api/clubs/:id`

### Notifications

- `GET /api/notifications`
- `PUT /api/notifications/:id`

### Registration

- `GET /api/registration`
- `GET /api/registration/participants/:eventId`
- `DELETE /api/registration/:id`

### Admin

- `GET /api/admin/stats`
- `GET /api/admin/users`
- `GET /api/admin/events`
- `PATCH /api/admin/users/:id/role`
- `PATCH /api/admin/events/:id/approve`
- `GET /api/admin/analytics`

## Suggested Development Workflow

1. Start MongoDB.
2. Run the backend with `npm run dev` from `backend/`.
3. Run the frontend with `npm run dev` from `frontend/`.
4. Open the frontend in the browser and sign up as a student, club, or admin.

## Production Notes

- Frontend can be deployed to Vercel or any static host.
- Backend should be deployed to a Node.js-compatible hosting provider.
- Store all secrets in environment variables and avoid committing `.env` files to version control.

## License

This project is currently distributed without a formal license declaration in the repository. If you plan to share or deploy it publicly, add an appropriate license file and terms of use.

## Contributing

Pull requests and feature suggestions are welcome. For major changes, open an issue first so the implementation direction can be discussed clearly.

