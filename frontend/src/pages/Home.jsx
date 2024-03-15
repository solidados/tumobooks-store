import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BooksTableView from '../components/homeView/BooksTableView.jsx';
import BooksCardView from '../components/homeView/BooksCardView.jsx';
import { MdOutlineAddBox } from 'react-icons/md';
import AppSpinner from '../components/AppSpinner.jsx';

const Home = () => {
  const [books, setBooks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ viewType, setViewType ] = useState('table');

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then(res => {
        setBooks(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      })
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600 text-white"
          onClick={() => setViewType('table')}
        >
          Table view
        </button>
        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600 text-white"
          onClick={() => setViewType('card')}
        >
          Card view
        </button>
        <Link to='/books/create'>
          <MdOutlineAddBox className="text-sky-800 text-4xl fill-sky-300 hover:fill-sky-600"/>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="w-full text-3xl pb-4 mt-4 mb-10 block border-b-8">Books List</h1>
      </div>
      {isLoading
        ? ( <AppSpinner /> )
        : viewType === 'table'
          ? ( <BooksTableView books={books} /> )
          : ( <BooksCardView books={books} /> )
      }
    </div>
  );
};

export default Home;
