import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppBackButton from '../components/AppBackButton.jsx';
import AppSpinner from '../components/AppSpinner.jsx';

const ShowBook = () => {
  const [ book, setBook ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false)
      })
  }, []);

  return (
    <div className="p-4">
      <AppBackButton />
      <h1 className="text-3xl pb-4 mt-4 mb-10 block border-b-8">Book Details</h1>
      {
        isLoading
          ? ( <AppSpinner /> )
          : (
            <div className="flex flex-col justify-center max-w-full m-auto p-4 border-2 rounded-xl border-sky-400">
              <div className="my-2">
                <span className="text-l mr-4 text-grey-500">Id</span>
                <span>{book._id}</span>
              </div>
              <div className="my-2">
                <span className="text-l mr-4 text-grey-500">Title</span>
                <span>{book.title}</span>
              </div>
              <div className="my-2">
                <span className="text-l mr-4 text-grey-500">Author</span>
                <span>{book.author}</span>
              </div>
              <div className="my-2">
                <span className="text-l mr-4 text-grey-500">Published Year</span>
                <span>{book.publishYear}</span>
              </div>
              <div className="my-0.5 font-light text-gray-500">
                <span className="text-l mr-4 text-grey-500">Created</span>
                <span>{new Date(book.createdAt).toDateString()}</span>
              </div>
              <div className="my-0.5 font-light text-gray-500">
                <span className="text-l mr-4 text-grey-500">Updated</span>
                <span>{new Date(book.updatedAt).toDateString()}</span>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default ShowBook;
