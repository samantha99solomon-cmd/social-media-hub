# Social Media Hub

A comprehensive app to manage your social media presence, collaborate with team members, and stay organized with reminders.

## Features

### 📱 Social Media Management
- Add and manage multiple social media handles (Twitter, Instagram, Facebook, LinkedIn, TikTok, YouTube, etc.)
- Track follower counts
- Update and delete social media profiles
- Centralized dashboard of all your accounts

### 💬 Group Chat
- Create private group chats with team members
- Real-time messaging using Socket.IO
- Add/remove members from groups
- Message history
- User presence tracking

### ⏰ Reminders
- Create reminders for important tasks and posts
- Set priority levels (low, medium, high)
- Track completion status
- Automatic notifications
- Sort by due date

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Socket.IO Client** - WebSocket client
- **React Router** - Navigation

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration

# Start server
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Social Handles
- `GET /api/social-handles` - Get all handles
- `POST /api/social-handles` - Add new handle
- `PUT /api/social-handles/:id` - Update handle
- `DELETE /api/social-handles/:id` - Delete handle

### Chat
- `POST /api/chat/groups` - Create group
- `GET /api/chat/groups` - Get user's groups
- `POST /api/chat/groups/:groupId/members` - Add member
- `GET /api/chat/groups/:groupId/messages` - Get messages

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

## Environment Variables

```
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/social-media-hub
JWT_SECRET=your-secret-key-here
```

## Running Both Server and Client

```bash
npm run dev
```

This will start both the Express server and React client concurrently.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project as needed.
