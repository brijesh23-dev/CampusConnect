# CampusConnect

CampusConnect is a MERN-style student event management project with a React frontend and an Express/MongoDB backend. It supports user registration, login, role-based routes, event management, notification delivery, and student interest tracking.

## Project Structure

- `backend/` – Express API server
  - `server.js` – entry point
  - `src/app.js` – Express app and route registration
  - `src/config/` – environment and database configuration
  - `src/controllers/` – controller logic for auth, events, notifications, and users
  - `src/middleware/` – authentication and role authorization
  - `src/models/` – MongoDB schemas for User, Event, Notification, Club
  - `src/routes/` – API routes for auth, test, events, users, notifications
- `frontend/` – React app built with Vite

## Key Features Implemented

- User registration and login
- JWT authentication via HttpOnly cookies
- Role-based access control for `student`, `club`, and `admin`
- Event CRUD for clubs/admins
- Student interest updates
- Notification retrieval and marking notifications as read
- CORS enabled for `http://localhost:5173`

## Backend Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or accessible via a connection string

### Install and Run Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
SALT_ROUNDS=10
```

### Start URL

`http://localhost:3000`

## Frontend Setup

The frontend lives in `frontend/` and uses Vite plus React.

```bash
cd frontend
npm install
npm run dev
```

The default development server runs on `http://localhost:5173`.

## API Reference

### Base URL

`http://localhost:3000`

### Authentication Routes

#### Register User

`POST /api/auth/register`

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "student"
}
```

Success response:

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "interests": []
  },
  "token": "<jwt-token>"
}
```

Notes:
- The API sets an HttpOnly `token` cookie on successful auth.
- Allowed roles: `student`, `club`, `admin`.

#### Login User

`POST /api/auth/login`

Body:

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "interests": []
  },
  "token": "<jwt-token>"
}
```

#### Get Current User

`GET /api/auth/getme`

Requires the `token` cookie.

Response:

```json
{
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "interests": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Event Routes

#### Create Event

`POST /api/events/create`

Requires authentication and role `club` or `admin`.

Body:

```json
{
  "title": "Coding Workshop",
  "description": "Learn full-stack development.",
  "category": "technology",
  "date": "2026-06-01T00:00:00.000Z",
  "time": "14:00",
  "venue": "Room 101"
}
```

Success response:

```json
{
  "message": "Event created successfully",
  "event": { ... }
}
```

#### Get All Events

`GET /api/events/all`

Response:

```json
{
  "message": "All events fetched successfully",
  "events": [ ... ]
}
```

#### Get Event by ID

`GET /api/events/:id`

Response:

```json
{
  "message": "Event fetched successfully",
  "event": { ... }
}
```

#### Get My Events

`GET /api/events/my-events`

Requires authentication and role `club` or `admin`.

Response:

```json
{
  "events": [ ... ]
}
```

#### Update Event

`PUT /api/events/update/:id`

Requires authentication and role `club` or `admin`.

Body: any subset of event fields, for example:

```json
{
  "description": "Updated description",
  "venue": "Hall B"
}
```

Success response:

```json
{
  "message": "Event updated successfully",
  "event": { ... }
}
```

#### Delete Event

`DELETE /api/events/delete/:id`

Requires authentication and role `club` or `admin`.

Response:

```json
{ "message": "Event deleted successfully" }
```

### User Routes

#### Update Student Interests

`PUT /api/users/interests`

Requires authentication and role `student`.

Body:

```json
{
  "interests": ["technology", "sports", "art"]
}
```

Response:

```json
{
  "message": "Interests updated",
  "user": { ... }
}
```

### Notification Routes

#### Get Notifications

`GET /api/notifications`

Requires authentication.

Response:

```json
{
  "notifications": [ ... ]
}
```

#### Mark Notification as Read

`PUT /api/notifications/:id`

Requires authentication.

Response:

```json
{
  "message": "Notification marked as read",
  "notification": { ... }
}
```

### Protected Role Routes

These routes verify the authenticated user's role.

#### Student Route

`GET /api/test/student`

Response:

```json
{ "message": "Welcome Student" }
```

#### Club Route

`GET /api/test/club`

Response:

```json
{ "message": "Welcome Club" }
```

#### Admin Route

`GET /api/test/admin`

Response:

```json
{ "message": "Welcome Admin" }
```

## Notes

- The backend uses cookie-based JWT authentication with `cookie-parser`.
- Events belong to club users and include title, description, category, date, time, venue, and club reference.
- Notifications are created for students that match event categories and can be marked as read.
- The frontend is available in `frontend/` and should be configured to send credentials when calling backend APIs.

## Future Improvements

- Add frontend route documentation when UI is complete
- Add tests for backend controllers and routes
- Improve event filtering and search
- Add real club profile management

```json
{ "message": "Welcome Admin" }
```

Possible unauthorized response:

```json
{ "message": "Role (student) is not allowed" }
```

## Authentication Details

- Auth uses JWT tokens signed with `JWT_SECRET`.
- The backend expects the token to be sent in an HttpOnly cookie named `token`.
- CORS is configured to allow requests from `http://localhost:5173` with credentials.

## Notes

- The backend exposes a root route at `/` returning `College Event API running`.
- The current protected routes are part of `backend/src/routes/test.routes.js`.
- User models support `name`, `email`, `password`, `role`, and `interests`.

## Recommended Frontend Integration

- Send login/register requests with `credentials: "include"` so the browser stores the cookie.
- Use `GET /api/auth/getme` to verify the authenticated user on page load.
- Use role-specific client logic to protect frontend routes for students, clubs, and admins.

## Project Structure

- `backend/server.js` — server startup and DB connection
- `backend/src/app.js` — Express app configuration
- `backend/src/config/config.js` — environment configuration
- `backend/src/controllers/auth.controller.js` — auth handlers
- `backend/src/middleware/auth.middleware.js` — auth and role checks
- `backend/src/models/` — Mongoose schemas for users, clubs, events, notifications
- `backend/src/routes/` — API routes

## Run with Nodemon

```bash
cd backend
npm run dev
```
