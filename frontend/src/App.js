import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import MovieBoard from './components/MovieBoard';
import AddMovieForm from './components/AddMovieForm';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error);
        toast.error('Failed to fetch data from server');
      },
    },
  },
});

function App() {
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newCategory = destination.droppableId;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/${draggableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update movie category');
      }

      await queryClient.invalidateQueries('movies');
      toast.success('Movie category updated');
    } catch (error) {
      console.error('Error updating movie category:', error);
      toast.error(error.message);
      // Refetch to ensure UI is in sync with server
      queryClient.invalidateQueries('movies');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary-900 flex items-center gap-2">
              <span className="text-3xl">🎬</span>
              WatchMov
            </h1>
            <button
              onClick={() => setIsAddingMovie(true)}
              className="px-4 py-2 bg-accent-purple text-white rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Movie
            </button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="animate-fade-in">
              <MovieBoard />
            </div>
          </DragDropContext>

          {isAddingMovie && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-card p-6 max-w-md w-full animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Add New Movie</h2>
                  <button
                    onClick={() => setIsAddingMovie(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <AddMovieForm onClose={() => setIsAddingMovie(false)} />
              </div>
            </div>
          )}
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
