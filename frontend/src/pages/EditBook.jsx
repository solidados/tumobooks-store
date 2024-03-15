import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AppBackButton from '../components/AppBackButton.jsx';
import AppSpinner from '../components/AppSpinner.jsx';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ publishYear, setPublishYear ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        enqueueSnackbar('Something went wrong', { variant: 'error' })
        console.error(err);
      })
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setIsLoading(true);

    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Book was edited successfully', { variant: 'success' })
        navigate('/');
      })
      .catch(err => {
        setIsLoading(false);
        enqueueSnackbar('Book edit failed', { variant: 'error' })
        console.error(err);
      })
  };

  return (
    <div className="p-4">
      <AppBackButton />
      <h1 className="text-3xl pb-4 mt-4 mb-10 block border-b-8">Edit Book</h1>
      {
        isLoading
          ? ( <AppSpinner /> )
          : (
            <div className="flex flex-col gap-y-4 w-[600px] mx-auto p-4 border-2 rounded-xl border-sky-600">
              <div className="mx-4">
                <label className="text-l mr-4 text-grey-500 relative top-3 left-3 bg-white px-2 font-light">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-600 text-2xl font-light"
                />
              </div>
              <div className="mx-4">
                <label className="text-l mr-4 text-grey-500 relative top-3 left-3 bg-white px-2 font-light">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-600 text-2xl font-light"
                />
              </div>
              <div className="mx-4">
                <label className="text-l mr-4 text-grey-500 relative top-3 left-3 bg-white px-2 font-light">Published Year</label>
                <input
                  type="text"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-600 text-2xl font-light"
                />
              </div>
              <button className="mx-4 my-8 p-2 bg-sky-500 text-white" onClick={handleEditBook}>Save</button>
            </div>
          )
      }
    </div>
  );
};

export default EditBook;
