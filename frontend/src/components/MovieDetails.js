import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function MovieDetails({ movie, isOpen, onClose }) {
  const genres = JSON.parse(movie.genres || '[]');
  const streamingLinks = JSON.parse(movie.streaming_links || '{}');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-start">
            <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
              {movie.title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="mt-4 rounded-lg w-full"
            />
          )}

          <div className="mt-4">
            <p className="text-sm text-gray-500">{movie.overview}</p>
          </div>

          {genres.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900">Genres</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 text-sm bg-gray-100 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.release_date && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900">Release Date</h4>
              <p className="text-sm text-gray-500">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          )}

          {Object.keys(streamingLinks).length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900">Available on</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(streamingLinks).map(([provider, details]) => (
                  <span
                    key={provider}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.trailer_url && (
            <div className="mt-4">
              <a
                href={movie.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Watch Trailer
              </a>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default MovieDetails;
