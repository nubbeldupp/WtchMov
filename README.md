# 🎬 WatchMov - Movie & TV Show Watchlist

A modern, self-hosted watchlist application for managing your movies and TV shows. Built with React, Node.js, and SQLite, featuring a beautiful sticky note-style interface and TMDB integration.

![WatchMov Screenshot](https://image.tmdb.org/t/p/w92/81XUX6wHmX3oNFJ4yyCxmYU0RYS.jpg)

## ✨ Features

### 📝 Movie/TV Show Management
- ➕ Add movies and TV shows with auto-fetched details from TMDB
- 📋 Organize content into categories: "To Watch," "Watching," and "Watched"
- 🔄 Drag-and-drop functionality for easy organization
- 🗑️ Delete titles you no longer want to track

### 🎯 Rich Content Display
- 🖼️ Compact movie cards with poster previews
- 📊 Movie/show details including:
  - 📌 Title and overview
  - 📅 Release date
  - 🏷️ Genres
  - 📺 Streaming availability
  - 🎥 Trailer links (when available)
- 📱 Responsive grid layout with scrollable categories

### 🛠️ Technical Features
- ⚡ Real-time updates
- 📱 Mobile-responsive design
- 💾 Persistent data storage with SQLite
- 🐳 Docker containerization for easy deployment
- 🔌 TMDB API integration for movie/show details

## 📋 Prerequisites

- 🐳 Docker and Docker Compose
- 🔑 TMDB API key (get it from [themoviedb.org](https://www.themoviedb.org/documentation/api))
- 💻 Node.js 18+ (for development)

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd watchmov
   ```

2. Create environment files:
   ```bash
   # Create backend .env
   echo "TMDB_API_KEY=your_api_key_here" > .env

   # Create frontend .env
   echo "REACT_APP_API_URL=http://your_server_ip:4000" > frontend/.env
   ```

3. Start the application:
   ```bash
   docker-compose up -d
   ```

4. Access the application at `http://your_server_ip`

## 👨‍💻 Development

### 📁 Project Structure
```
.
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── database.js   # Database configuration
│   │   └── index.js      # Server entry point
│   └── package.json      # Backend dependencies
├── data/                 # SQLite database volume
├── docker-compose.yml    # Docker composition config
└── README.md
```

### 🔧 Technology Stack
- **🎨 Frontend**:
  - ⚛️ React.js
  - 🎨 Tailwind CSS for styling
  - 🔄 React Beautiful DND for drag-and-drop
  - 🔄 React Query for data fetching
  - 🔔 React Toastify for notifications

- **⚙️ Backend**:
  - 🟢 Node.js with Express
  - 🗄️ SQLite3 for database
  - 🎬 TMDB API integration

- **🏗️ Infrastructure**:
  - 🐳 Docker & Docker Compose
  - 💾 Persistent volumes for data storage

## 📚 API Documentation

### 🔌 Endpoints

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add a new movie
- `PATCH /api/movies/:id/category` - Update movie category
- `DELETE /api/movies/:id` - Delete a movie

## 🚀 Deployment

### 🖥️ Server Deployment
1. Copy files to your server:
   ```bash
   rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'data' ./ user@your_server:/path/to/watchmov/
   ```

2. Set up environment variables on the server
3. Run docker-compose:
   ```bash
   docker-compose up -d
   ```

### 🐳 Container Management
- 📋 View logs: `docker-compose logs -f`
- 🔄 Restart services: `docker-compose restart`
- 🛑 Stop application: `docker-compose down`
- 🔄 Update and rebuild: `docker-compose up -d --build`

## 🤝 Contributing

1. 🔀 Fork the repository
2. 🌿 Create your feature branch
3. ✍️ Commit your changes
4. 🚀 Push to the branch
5. 📬 Create a new Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- 🎬 [TMDB](https://www.themoviedb.org/) for their excellent movie database API
- 🔄 [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd) for the drag-and-drop functionality
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for the styling system
