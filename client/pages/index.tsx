import Head from 'next/head';
import Feed from '../components/Feed';
import Navigation from '../components/Navigation';
import Trending from '../components/Trending';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <div className='w-[25%] h-full fixed'>
          <Navigation />
        </div>
        <div className='ml-[25%] w-[75%] flex justify-between'>
          <Feed />
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Home;
