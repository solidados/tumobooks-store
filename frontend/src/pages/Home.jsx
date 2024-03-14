import React from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AppSpinner from '../components/AppSpinner.jsx';

const Home = () => {
  const [books, setBooks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
      <div className="flex justify-between items-center">
        <h1 className="w-full text-3xl pb-4 mt-4 mb-10 block border-b-8">Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className="text-sky-800 text-4xl"/>
        </Link>
      </div>
      {isLoading
        ? ( <AppSpinner /> )
        : (
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md bg-sky-900 text-white font-light">No.</th>
                <th className="border border-slate-600 rounded-md bg-sky-900 text-white font-light">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden bg-sky-900 text-white font-light">Author</th>
                <th className="border border-slate-600 rounded-md max-md:hidden bg-sky-900 text-white font-light">Published Year</th>
                <th className="border border-slate-600 rounded-md bg-sky-900 text-white font-light">Operations</th>
              </tr>
            </thead>
            <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishYear}</td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800"/>
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600"/>
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600"/>
                    </Link>
                  </div>
                </td>
              </tr>
              )
            )}
            </tbody>
          </table>
        )
      }
    </div>
  );
};

export default Home;
