import Link from 'next/link';
import Image from 'next/image';

import { BsTwitter } from 'react-icons/bs';
import { BiHomeCircle, BiBookmark } from 'react-icons/bi';
import { HiOutlineHashtag, HiOutlineBell } from 'react-icons/hi';
import { GrSearch } from 'react-icons/gr';
import { TbMessages } from 'react-icons/tb';
import { RiFileListLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { CgMoreO } from 'react-icons/cg';
import { FiMoreHorizontal, FiFeather } from 'react-icons/fi';

import constants from '../constants';

const Navigation = () => {
  return (
    <div className='mr-[15%]'>
      <div className='relative h-screen flex flex-col'>
        <div className='py-2 ml-[2px]'>
          <Link href='/'>
            <div className='w-12 h-12 rounded-full hover:bg-twitter-light flex items-center justify-center'>
              <BsTwitter className='text-twitter w-[90%] h-[90%] p-2' />
            </div>
          </Link>
        </div>

        <div className='flex flex-col items-center xl:items-start'>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <BiHomeCircle className='text-3xl' />
            <span className='hidden xl:block text-xl font-bold'>Home</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <HiOutlineHashtag className='hidden md2:block text-3xl' />
            <GrSearch className='md2:hidden text-3xl pl-[2px]' />
            <span className='hidden xl:block text-xl'>Explore</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <HiOutlineBell className='text-3xl' />
            <span className='hidden xl:block text-xl'>Notifications</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <TbMessages className='text-3xl' />
            <span className='hidden xl:block text-xl'>Messages</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <BiBookmark className='text-3xl' />
            <span className='hidden xl:block text-xl'>Bookmarks</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <RiFileListLine className='text-3xl' />
            <span className='hidden xl:block text-xl'>Lists</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <FaRegUser className='text-2xl' />
            <span className='hidden xl:block text-xl'>Profile</span>
          </Link>
          <Link
            href='/'
            className='flex items-center xl:space-x-3 p-2 xl:pl-3 xl:pr-8 mb-3 rounded-full hover:bg-gray-200'
          >
            <CgMoreO className='text-2xl' />
            <span className='hidden xl:block text-xl'>More</span>
          </Link>

          <button
            className='text-white bg-twitter hover:bg-twitter-dark p-2 xl:p-3 
            w-10 h-10 xl:w-full rounded-full text-base xl:text-lg font-semibold flex items-center     justify-center'
          >
            <span className='rounded-full xl:hidden'>
              <FiFeather />
            </span>
            <span className='hidden xl:block'>Tweet</span>
          </button>
        </div>

        <div className='absolute bottom-0 w-full hover:bg-gray-200 hover:cursor-pointer rounded-full flex items-center px-3 py-2'>
          <div className='w-11 h-11'>
            <Image
              src={constants.placeholder_profilePicture}
              alt='User'
              width={44}
              height={44}
              className='rounded-full'
            />
          </div>
          <div className='hidden xl:flex xl:flex-col xl:flex-1 xl:ml-3'>
            <span className='font-bold'>Diganta Som</span>
            <span className='text-gray-600 text-sm'>@ImDSom111</span>
          </div>
          <FiMoreHorizontal className='hidden xl:block' />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
