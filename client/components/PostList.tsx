import { useGetTweetsQuery } from '../features/tweet/tweet.api-slice';

import PostItem from './PostItem';

const PostList = () => {
  const {
    data: tweets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTweetsQuery(undefined);

  let content;

  if (isLoading) {
    content = 'Loading...';
  }

  if (isError) {
    // TODO:
    content = <p>Error loading Tweets</p>;
  }

  if (isSuccess) {
    tweets?.ids.length &&
      (content = tweets?.ids.map(tweetId => (
        <PostItem key={tweetId} tweetId={tweetId} />
      )));
  }

  return content;
};

export default PostList;
