import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineSparkles } from 'react-icons/hi';

import constants from '../constants';
import ProfilePicture from './ProfilePicture';

const Header = () => {
  return (
    <div
      className='flex items-center justify-between sticky top-0 z-50 bg-white opacity-90 
      h-12 px-4'
    >
      <Link href='/' className='flex items-center'>
        <div className='block ph:hidden mr-3'>
          <ProfilePicture />
        </div>
        <span className='font-bold text-lg ph:text-xl -mt-1'>Home</span>
      </Link>

      <div
        className='w-10 h-10 rounded-full hover:bg-gray-200 hover:cursor-pointer 
        flex items-center justify-center'
      >
        <HiOutlineSparkles className='text-xl' />
      </div>
    </div>
  );
};

export default Header;
