# 🎬 WatchMov - Movie & TV Show Watchlist

A modern, self-hosted movie and TV show watchlist application with a beautiful sticky note-style interface. Keep track of what you want to watch, what you're currently watching, and what you've already watched!

## ✨ Features

🎯 **Core Features**
- Add, edit, and delete movies/TV shows with auto-fetched details
- Drag-and-drop organization between categories
- Beautiful sticky note-style UI with grid layout
- Mobile-responsive design

🎨 **User Interface**
- Compact movie cards with poster previews
- Quick access to trailers and movie details
- Smooth animations and transitions
- Infinite scrolling within categories

🔍 **Movie Information**
- Auto-fetch details from TMDB API
- Movie posters and backdrop images
- Genres and release dates
- Streaming availability information
- Trailer links
- Rotten Tomatoes scores

🛠️ **Technical Stack**
- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express.js
- Database: SQLite for simplicity
- Container: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- TMDB API key (get it from [themoviedb.org](https://www.themoviedb.org/documentation/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/watchmov.git
cd watchmov
```

2. Create a `.env` file in the root directory:
```bash
TMDB_API_KEY=your_api_key_here
```

3. Start the application:
```bash
docker-compose up -d
```

4. Access the application at `http://localhost` or your server IP

## 🏗️ Project Structure

```
.
├── 📁 frontend/           # React frontend application
│   ├── src/              # Source code
│   ├── public/           # Static files
│   └── Dockerfile        # Frontend container config
├── 📁 backend/           # Node.js backend API
│   ├── src/             # Source code
│   └── Dockerfile       # Backend container config
├── 📁 data/             # SQLite database volume
├── 🐳 docker-compose.yml # Docker composition config
└── 📝 README.md
```

## 🔧 Development

To run the application in development mode:

```bash
# Start all services
docker-compose up -d

# Watch frontend logs
docker-compose logs -f frontend

# Watch backend logs
docker-compose logs -f backend
```

## 🔒 Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend API URL

### Backend
- `TMDB_API_KEY`: Your TMDB API key
- `NODE_ENV`: Environment (development/production)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

MIT

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their excellent movie database API
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for the smooth drag-and-drop experience
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling system
