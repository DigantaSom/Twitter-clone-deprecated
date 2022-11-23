import Link from 'next/link';
import { HiOutlineSparkles } from 'react-icons/hi';

import CreateTweet from './CreateTweet';

const Header = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <Link href='/' className='font-bold text-lg'>
          Home
        </Link>
        <HiOutlineSparkles className='text-xl cursor-pointer' />
      </div>
      <CreateTweet />
    </div>
  );
};

export default Header;
