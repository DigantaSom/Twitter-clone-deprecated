import Head from 'next/head';

import Layout from '../components/Layout';
import Feed from '../components/Feed';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <Header />
        <Feed />
      </Layout>
    </div>
  );
};

export default Home;
