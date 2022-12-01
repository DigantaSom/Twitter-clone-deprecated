import { FC } from 'react';

interface TweetSubmitButtonProps {
  isDisabled: boolean;
}

const TweetSubmitButton: FC<TweetSubmitButtonProps> = ({ isDisabled }) => {
  return (
    <button
      onClick={() => {}}
      disabled={isDisabled}
      className='font-medium text-sm ph_sm:text-base text-white bg-twitter hover:bg-twitter-dark rounded-full px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-twitter'
    >
      Tweet
    </button>
  );
};

export default TweetSubmitButton;
