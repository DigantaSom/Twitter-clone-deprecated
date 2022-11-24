import Head from 'next/head';
import Navigation from '../components/Navigation';
import Feed from '../components/Feed';
import Trending from '../components/Trending';
import BottomNavigation from '../components/BottomNavigation';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-[664px] md2:max-w-[90vw] xl:max-w-7xl m-auto flex h-screen'>
        <div className='hidden ph:block w-16 xl:w-[20%]'>
          <Navigation />
        </div>
        <div className='flex-1 xl:w-[75%] flex overflow-y-scroll'>
          <Feed />
          <Trending />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
