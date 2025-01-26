import React from 'react';
import { useQuery } from 'react-query';
import { Droppable } from 'react-beautiful-dnd';
import MovieNote from './MovieNote';

const categories = ['To Watch', 'Watching', 'Watched'];

const categoryIcons = {
  'To Watch': '📋',
  'Watching': '🎬',
  'Watched': '✅'
};

const categoryColors = {
  'To Watch': 'border-accent-orange',
  'Watching': 'border-accent-purple',
  'Watched': 'border-accent-teal'
};

function MovieBoard() {
  const { data: movies, isLoading, error } = useQuery('movies', () =>
    fetch(`${process.env.REACT_APP_API_URL}/movies`).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        Error loading movies: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category}
          className={`bg-white rounded-xl shadow-card overflow-hidden border-t-4 ${categoryColors[category]}`}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{categoryIcons[category]}</span>
              <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
              <span className="ml-auto bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
                {movies?.filter((movie) => movie.category === category).length || 0}
              </span>
            </div>
            
            <Droppable droppableId={category} type="MOVIE">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 min-h-[200px] max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent"
                >
                  {movies
                    ?.filter((movie) => movie.category === category)
                    .map((movie, index) => (
                      <MovieNote key={movie.id} movie={movie} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieBoard;
