import Header from './Header';

const Feed = () => {
  return (
    <div className='border-l-[1px] border-r-[1px] border-b-[1px] border-gray-200 w-[55%] py-2'>
      <div className='border-b-[1px] border-gray-200 px-4'>
        <Header />
      </div>
      <div className='px-4'>list of posts</div>
    </div>
  );
};

export default Feed;
