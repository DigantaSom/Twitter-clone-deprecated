import PulseLoader from 'react-spinners/PulseLoader';

import { useGetTweetsQuery } from './tweet.api-slice';

import PostItem from './PostItem';

const PostList = (): JSX.Element => {
  const {
    data: tweets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTweetsQuery(undefined, {
    pollingInterval: 15000, // every 15s on this page, it will requery the data
    refetchOnFocus: true, // refetch on putting focus back to browser window
    refetchOnMountOrArgChange: true, // refetch on component mount
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = <PulseLoader color='#fff' />;
  } else if (isError) {
    console.log('Error loading Tweets:', error);
    content = <div>Error loading Tweets</div>;
  } else if (isSuccess && tweets?.ids.length) {
    content = tweets.ids.map(tweetId => (
      <PostItem key={tweetId} tweetId={tweetId} />
    ));
  }

  return <>{content}</>;
};

export default PostList;
