import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import React from 'react';

const BooksTableView = ( { books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
      <tr>
        <th className="border border-slate-600 rounded-md bg-sky-900 text-white font-light">No.</th>
        <th className="border border-slate-600 rounded-md bg-sky-900 text-white font-light">Title</th>
        <th className="border border-slate-600 rounded-md max-md:hidden bg-sky-900 text-white font-light">Author</th>
        <th className="border border-slate-600 rounded-md max-md:hidden bg-sky-900 text-white font-light">Published
          Year
        </th>
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
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        )
      )}
      </tbody>
    </table>
  );
};

export default BooksTableView;
