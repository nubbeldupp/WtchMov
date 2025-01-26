import React from 'react';
import { useQuery } from 'react-query';
import { Droppable } from 'react-beautiful-dnd';
import MovieNote from './MovieNote';

const categories = ['To Watch', 'Watching', 'Watched'];

function MovieBoard() {
  const { data: movies, isLoading, error } = useQuery('movies', () =>
    fetch(`${process.env.REACT_APP_API_URL}/api/movies`).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading movies: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{category}</h2>
          <Droppable droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3 min-h-[200px] max-h-[calc(100vh-200px)] overflow-y-auto pr-2"
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
      ))}
    </div>
  );
}

export default MovieBoard;
