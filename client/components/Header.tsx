import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineSparkles } from 'react-icons/hi';

const Header = () => {
  return (
    <div className='flex items-center justify-between py-1'>
      <Link href='/' className='flex items-center'>
        <div className='block ph:hidden w-11 h-11 mr-4'>
          <Image
            src='https://www.prognos.com/sites/default/files/styles/profile_image/public/2020-06/profile-pic-placeholder.png?itok=x2Ckkfjo'
            alt='User'
            width={44}
            height={44}
            className='rounded-full'
          />
        </div>
        <span className='font-bold text-lg ph:text-xl -mt-1 ph:mt-0'>Home</span>
      </Link>
      <HiOutlineSparkles className='text-xl cursor-pointer' />
    </div>
  );
};

export default Header;
