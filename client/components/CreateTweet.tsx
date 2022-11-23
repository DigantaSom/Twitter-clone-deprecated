import Image from 'next/image';

import {
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { GrEmoji } from 'react-icons/gr';
import { CgPin } from 'react-icons/cg';

const CreateTweet = () => {
  return (
    <>
      <div className='flex items-start justify-between py-3'>
        {/* left */}
        <div className='pr-3'>
          <div className='w-12 h-12'>
            <Image
              src='https://www.prognos.com/sites/default/files/styles/profile_image/public/2020-06/profile-pic-placeholder.png?itok=x2Ckkfjo'
              alt='User'
              width={48}
              height={48}
              className='rounded-full'
            />
          </div>
        </div>

        {/* right */}
        <div className='flex flex-col w-full'>
          <textarea
            placeholder="What's happening?"
            rows={2}
            className='w-full placeholder-gray-600 placeholder:text-xl py-2 outline-none focus:border-b-[1px] focus:border-gray-200'
          ></textarea>

          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center space-x-3 text-twitter text-xl'>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <AiOutlinePicture />
              </div>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <AiOutlineFileGif />
              </div>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <BiPoll />
              </div>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <GrEmoji />
              </div>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <AiOutlineSchedule />
              </div>
              <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
                <CgPin />
              </div>
            </div>
            <button className='text-white bg-twitter hover:bg-twitter-dark rounded-full px-4 py-2 font-medium'>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTweet;
