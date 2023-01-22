import CreateTweet from '../features/tweet/CreateTweet';
import PostList from '../features/tweet/PostList';

const Feed = () => {
  return (
    <>
      <CreateTweet from='Feed' />
      <PostList />
    </>
  );
};

export default Feed;
