import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { BsDot } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';

import ProfilePicture from './ProfilePicture';
import TweetActions from './TweetActions';

import { Tweet } from '../types';

interface PostItemProps {
  tweet: Tweet;
}

const PostItem: FC<PostItemProps> = ({
  tweet: {
    fullName,
    twitterHandle,
    profilePicture,
    id: tweetId,
    caption,
    media,
  },
}) => {
  const router = useRouter();

  const navigateToPost = () => {
    router.push(`/${twitterHandle}/status/${tweetId}`);
  };

  const navigateToPostFullScreen = () => {
    router.push(`/${twitterHandle}/status/${tweetId}/photo`);
  };

  return (
    <div
      className='p-2 ph_sm:p-4 pb-3 hover:bg-gray-100 hover:cursor-pointer 
      border-b-[1px] border-gray-200'
    >
      <div className='flex items-start'>
        <ProfilePicture uri={profilePicture} />

        <div className='ml-2 ph_sm:ml-3 flex-1'>
          <div className='flex items-start ph_sm:items-center justify-between'>
            <div
              className='flex items-center space-x-2'
              onClick={navigateToPost}
            >
              <div className='flex flex-col ph_sm:flex-row ph_sm:items-center ph_sm:space-x-2'>
                <h3 className='font-bold'>{fullName}</h3>
                <div className='flex items-center space-x-1'>
                  <span className='text-gray-500'>@{twitterHandle}</span>
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
            {caption}
          </p>

          <div
            onClick={navigateToPostFullScreen}
            className='custom-image-container relative pt-3 pb-2'
          >
            <Image
              src={media[0]}
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
