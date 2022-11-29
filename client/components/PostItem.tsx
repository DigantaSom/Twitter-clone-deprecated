import { FC } from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';

import { BsDot } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';

import ProfilePicture from './ProfilePicture';
import TweetActions from './TweetActions';

interface PostItemProps {
  imageSrc: StaticImageData;
}

const PostItem: FC<PostItemProps> = ({ imageSrc }) => {
  const router = useRouter();

  const navigateToPost = () => {
    // router.push('/[handle]/status/[tweet_id]');
  };

  return (
    <div
      className='p-2 ph_sm:p-4 pb-3 hover:bg-gray-100 hover:cursor-pointer 
      border-b-[1px] border-gray-200'
    >
      <div className='flex items-start'>
        <ProfilePicture />

        <div className='ml-2 ph_sm:ml-3 flex-1'>
          <div className='flex items-start ph_sm:items-center justify-between'>
            <div
              className='flex items-center space-x-2'
              onClick={navigateToPost}
            >
              <div className='flex flex-col ph_sm:flex-row ph_sm:items-center ph_sm:space-x-2'>
                <h3 className='font-bold'>Jenna Ortega</h3>
                <div className='flex items-center space-x-1'>
                  <span className='text-gray-500'>@jennaortega</span>
                  <BsDot />
                  <span className='text-gray-500'>16h</span>
                </div>
              </div>
            </div>
            <FiMoreHorizontal
              className='text-xl ph:text-2xl text-gray-500'
              onClick={() => {}}
            />
          </div>

          <p className='mt-1 ph_sm:mt-[2px]' onClick={navigateToPost}>
            Eat your turkey and maybe watch the show. Please don't let this
            outfit be for nothing.
          </p>

          <div className='custom-image-container relative pt-3 pb-2'>
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

          <TweetActions />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
