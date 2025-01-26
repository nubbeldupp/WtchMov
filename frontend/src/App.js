import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DragDropContext } from 'react-beautiful-dnd';
import MovieBoard from './components/MovieBoard';
import AddMovieForm from './components/AddMovieForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newCategory = destination.droppableId;

    // Update movie category
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${draggableId}/category`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: newCategory }),
    })
      .then(() => {
        queryClient.invalidateQueries('movies');
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">WatchMov</h1>
          
          <AddMovieForm />
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <MovieBoard />
          </DragDropContext>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
