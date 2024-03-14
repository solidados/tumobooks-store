import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const AppBackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="w-fit px-4 py-1 rounded-lg text-white bg-sky-800"
      >
        <BsArrowLeft className="text-2xl"/>
      </Link>
    </div>
  );
};

export default AppBackButton;
