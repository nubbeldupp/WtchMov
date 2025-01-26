import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TrashIcon, PlayIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import MovieDetails from './MovieDetails';

function MovieNote({ movie, index }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          // Invalidate and refetch movies query
          window.location.reload();
        })
        .catch((error) => console.error('Error deleting movie:', error));
    }
  };

  const noteColors = {
    'To Watch': 'bg-note-yellow',
    'Watching': 'bg-note-blue',
    'Watched': 'bg-note-green',
  };

  return (
    <>
      <Draggable draggableId={String(movie.id)} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${noteColors[movie.category]} rounded-lg shadow-note p-3 transform transition-transform duration-200 hover:-translate-y-1 flex gap-3 items-start`}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 text-sm">{movie.title}</h3>
                <div className="flex space-x-1">
                  {movie.trailer_url && (
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <PlayIcon className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <InformationCircleIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {movie.overview && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {movie.overview}
                </p>
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
