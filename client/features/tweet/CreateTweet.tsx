import { FC, useEffect, useState } from 'react';

import {
  AiOutlinePicture,
  AiOutlineFileGif,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { GrEmoji } from 'react-icons/gr';
import { CgPin } from 'react-icons/cg';

import ProfilePicture from '../../components/ProfilePicture';
import TweetSubmitButton from './TweetSubmitButton';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { handleSubmitDisabled } from '../ui/ui.slice';

import constants from '../../constants';

interface CreateTweetProps {
  from: 'Feed' | 'ComposeTweet';
}

const CreateTweet: FC<CreateTweetProps> = ({ from }) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleSubmitDisabled(text === ''));
  }, [text]);

  let container_dynamicStyles = '';
  let textarea_dynamicStyles = '';
  let icon_dynamicStyles = '';

  if (from === 'Feed') {
    container_dynamicStyles =
      'hidden ph:flex py-3 px-4 border-b-[1px] border-gray-200';
    textarea_dynamicStyles = 'focus:border-b-[1px] focus:border-gray-200';
    icon_dynamicStyles = 'hidden sm:block';
  } else if (from === 'ComposeTweet') {
    container_dynamicStyles = 'flex';
    textarea_dynamicStyles = 'border-b-[1px] border-gray-200';
    icon_dynamicStyles = 'block';
  }

  return (
    <div
      className={`${container_dynamicStyles} items-start justify-between h-full`}
    >
      {/* left */}
      <ProfilePicture uri={constants.placeholder_profilePicture} />

      {/* right */}
      <div className='flex flex-col w-full h-full ml-3'>
        <textarea
          placeholder="What's happening?"
          rows={2}
          onChange={e => setText(e.target.value)}
          className={`w-full flex-1 placeholder-gray-600 placeholder:text-xl py-2 outline-none ${textarea_dynamicStyles}`}
        ></textarea>

        <div className='flex items-center justify-between mt-4 ph:mt-2'>
          <div className='flex items-center ph_xs:space-x-1 text-twitter text-xl'>
            <div className='p-1 mr-[2px] ph_xs:p-2 ph_xs:mr-0 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
              <AiOutlinePicture />
            </div>
            <div className='p-2 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
              <AiOutlineFileGif />
            </div>
            <div
              className={`${icon_dynamicStyles} p-1 mr-[2px] ph_xs:p-2 ph_xs:mr-0 rounded-full hover:cursor-pointer hover:bg-twitter-light`}
            >
              <BiPoll />
            </div>
            <div className='p-1 mr-[2px] ph_xs:p-2 ph_xs:mr-0 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
              <GrEmoji />
            </div>
            <div
              className={`${icon_dynamicStyles} p-1 mr-[2px] ph_xs:p-2 ph_xs:mr-0 rounded-full hover:cursor-pointer hover:bg-twitter-light`}
            >
              <AiOutlineSchedule />
            </div>
            <div className='p-1 mr-[2px] ph_xs:p-2 ph_xs:mr-0 rounded-full hover:cursor-pointer hover:bg-twitter-light'>
              <CgPin />
            </div>
          </div>

          <div className='hidden ph:block'>
            <TweetSubmitButton isDisabled={text === ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
