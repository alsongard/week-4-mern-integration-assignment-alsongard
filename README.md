# Blog Website - MERN Stack Application

A full-stack blog website built with the MERN stack, featuring user authentication, protected routes, and a modern responsive design.

## 🚀 Technologies Used

### Frontend
- **Vite** - Fast build tool and development server
- **React 19** - Modern UI library with hooks and components
- **TailwindCSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management for authentication and protected routes
- **Axios** - HTTP client for API requests to the backend
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
├── client/
│   └── client/
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── store/         # Redux store and reducers
│       │   ├── utils/         # Utility functions
│       │   └── assets/        # Images and static assets
│       ├── package.json
│       └── vite.config.js
└── server/
    ├── models/                # MongoDB models
    ├── myserver.js             # Express server configuration
    └── package.json
```

## 🔑 Key Features

- **User Authentication**: Secure registration and login system
- **Protected Routes**: Redux-based route protection for authenticated users
- **Blog Management**: Create, read, and manage blog posts
- **Admin Dashboard**: Administrative interface
- **Dark Mode**: Toggle between light and dark themes
- **Full-Stack Integration**: Complete frontend-backend communication using Axios

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

## 📱 Application Routes

### Public Routes
- `/` - Home page
- `/signin` - User registration page - **Create a new user account here**
- `/login` - User login page - **Login with existing credentials here**

### Protected Routes (Require Authentication)
- `/posts` - **Create and manage blog posts** - Main blogging interface
- `/admin` - Admin dashboard (requires authentication)

## 🔐 Authentication Flow

1. **Registration**: Users can create accounts on `/signin`
2. **Login**: Users authenticate on `/login`
3. **Protected Access**: Redux manages authentication state for secure routes
4. **JWT Tokens**: Stored in localStorage for session persistence
5. **Route Protection**: Higher-order components protect sensitive routes

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Toggle**: Switch between light and dark themes
- **Modern Interface**: Clean, intuitive user experience built with TailwindCSS
- **Loading States**: Visual feedback during API requests
- **Error Handling**: User-friendly error messages

## 🔧 Development Scripts

### Frontend (client/client)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend (server)
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 🌟 Key Implementation Details

- **State Management**: Redux Toolkit for centralized authentication state
- **API Integration**: Axios for HTTP requests with proper error handling
- **Protected Routes**: Higher-order component pattern for route protection
- **Authentication**: JWT-based authentication with localStorage persistence
- **Styling**: TailwindCSS for responsive and modern UI design
- **Database**: MongoDB with Mongoose for data modeling
- **Fully Integrated**: Frontend and backend work together seamlessly

## 🔗 Backend Integration

The project is **fully integrated** with the backend located in the `server/` folder. The frontend uses Axios to:
- Authenticate users via API endpoints
- Fetch and create blog posts
- Handle user sessions and protected routes
- Communicate with MongoDB through the Express.js API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ using the MERN stack, Vite, React, TailwindCSS, and Redux 