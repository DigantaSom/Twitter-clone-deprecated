import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

import { BsDot } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';

import ProfilePicture from './ProfilePicture';

interface PostItemProps {
  imageSrc: StaticImageData;
}

const PostItem: FC<PostItemProps> = ({ imageSrc }) => {
  return (
    <div
      className='p-4 hover:bg-gray-100 hover:cursor-pointer 
      border-b-[1px] border-gray-200'
    >
      <div className='flex items-start'>
        <ProfilePicture />

        <div className='ml-3 flex-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <h3 className='font-bold'>Jenna Ortega</h3>
              <span className='text-gray-500'>@jennaortega</span>
              <BsDot />
              <span className='text-gray-500'>16h</span>
            </div>
            <FiMoreHorizontal className='text-2xl text-gray-500' />
          </div>

          <p className='mt-[2px]'>
            Eat your turkey and maybe watch the show. Please don't let this
            outfit be for nothing.
          </p>

          <div className='custom-image-container relative my-3'>
            <Image
              src={imageSrc}
              fill
              sizes='100%'
              priority={false}
              placeholder='blur'
              alt='Post'
              className='custom-image rounded-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
