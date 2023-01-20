import { useEffect } from 'react';

import PostItem from './PostItem';

import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchTweetSuccess } from '../redux/tweet/tweet.slice';

const PostList = () => {
  const dispatch = useAppDispatch();
  const { tweets, isLoading, error } = useAppSelector(state => state.tweet);

  useEffect(() => {
    dispatch(fetchTweetSuccess());
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    !isLoading &&
    !error && (
      <div>
        {tweets.map(tweet => (
          <PostItem key={tweet.id} tweet={tweet} />
        ))}
        <br />
        <br />
      </div>
    )
  );
};

export default PostList;
