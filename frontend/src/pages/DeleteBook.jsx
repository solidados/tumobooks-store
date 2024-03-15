import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AppBackButton from '../components/AppBackButton.jsx';
import AppSpinner from '../components/AppSpinner.jsx';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Book was deleted successfully', { variant: 'success' })
        navigate('/')
      })
      .catch(err => {
        setIsLoading(false);
        enqueueSnackbar('Something went wrong', { variant: 'error' })
        console.error(err);
      })
  };

  const handleCancel = () => {
    enqueueSnackbar('Delete process was cancelled', { variant: 'warning' })
    navigate('/');
  }

  return (
    <div className="p-4">
      <AppBackButton />
      <h1 className="text-3xl pb-4 mt-4 mb-10 block border-b-8">Delete Book</h1>
      { isLoading
        ? ( <AppSpinner />)
        : (
          <div className="flex flex-col items-center w-[600px] mx-auto p-8 border-2 rounded-xl border-sky-600">
            <h3 className="text-2xl mb-6">Are you sure you want to delete this book?</h3>
            <button
              onClick={handleDeleteBook}
              className="w-full mx-8 mb-6 p-3 bg-red-600 text-white">Delete
            </button>
            <button
              onClick={handleCancel}
              className="w-full mx-8 p-3 bg-gray-400 text-white">Cancel
            </button>
          </div>
        )
      }
    </div>
  );
};

export default DeleteBook;
