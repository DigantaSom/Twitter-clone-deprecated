import Header from './Header';
import CreateTweet from './CreateTweet';
import PostList from './PostList';

const Feed = () => {
  return (
    <div className='w-full md:min-w-[600px] py-2'>
      <div className='ph:border-r-[1px] ph:border-gray-200'>
        <Header />
        <CreateTweet />
        <PostList />
      </div>
    </div>
  );
};

export default Feed;
