import Header from './Header';
import CreateTweet from './CreateTweet';

const Feed = () => {
  return (
    <div className='w-full md:min-w-[600px] py-2'>
      <div className='border-b-[1px] border-x-[1px] border-gray-200 px-4'>
        <Header />
        <CreateTweet />
      </div>
      <div className='border-x-[1px] border-gray-200 px-4'></div>
    </div>
  );
};

export default Feed;
