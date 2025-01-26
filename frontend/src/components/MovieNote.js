import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TrashIcon, PlayIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import MovieDetails from './MovieDetails';

const categoryColors = {
  'To Watch': 'from-accent-orange/10 to-accent-orange/5',
  'Watching': 'from-accent-purple/10 to-accent-purple/5',
  'Watched': 'from-accent-teal/10 to-accent-teal/5'
};

function MovieNote({ movie, index }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/${movie.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete movie: ${response.statusText}`);
        }

        toast.success('Movie deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting movie:', error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Draggable draggableId={String(movie.id)} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-gradient-to-br ${categoryColors[movie.category]} rounded-lg shadow-card p-4 transform transition-all duration-200 hover:-translate-y-1 ${snapshot.isDragging ? 'rotate-3 scale-105' : ''} flex gap-4 items-start`}
          >
            {movie.poster_path && (
              <div className="relative group flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                />
                {movie.vote_average && (
                  <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
            )}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-gray-800 text-base truncate">
                  {movie.title}
                  {movie.release_date && (
                    <span className="text-gray-500 text-sm ml-2">
                      ({new Date(movie.release_date).getFullYear()})
                    </span>
                  )}
                </h3>
                <div className="flex space-x-2 flex-shrink-0">
                  {movie.trailer_url && (
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-accent-purple transition-colors"
                    >
                      <PlayIcon className="h-5 w-5" />
                    </a>
                  )}
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-gray-600 hover:text-accent-teal transition-colors"
                  >
                    <InformationCircleIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-gray-600 hover:text-accent-pink transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {movie.overview && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {movie.overview}
                </p>
              )}
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {JSON.parse(movie.genres).slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/50 text-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>

      <MovieDetails
        movie={movie}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}

export default MovieNote;
