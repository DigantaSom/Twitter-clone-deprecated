import CreateTweet from './CreateTweet';
import PostList from './PostList';

const Feed = () => {
  return (
    <>
      <CreateTweet from='Feed' />
      <PostList />
    </>
  );
};

export default Feed;
