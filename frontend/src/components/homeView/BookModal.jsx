import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col relative w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4"
      >
        <AiOutlineClose
          className="absolute top-6 right-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">{book.publishYear}</h2>
        <h4 className="my-2 font-thin text-gray-300">id: {(book._id).slice(-4)}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-2xl text-red-300" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-2xl text-red-300" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <p className="mt-4">Description</p>
        <p className="mt-2">{book.description}</p>
      </div>
    </div>
  );
};

export default BookModal;
