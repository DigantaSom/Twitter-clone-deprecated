import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='text-3xl text-red-500'>heyo!</div>
    </div>
  );
};

export default Home;
