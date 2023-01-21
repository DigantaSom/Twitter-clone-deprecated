import Head from 'next/head';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../features/auth/auth.slice';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Explore from '../components/Explore';

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        {isAuthenticated ? (
          <>
            <Header />
            <Feed />
          </>
        ) : (
          <Explore />
        )}
      </Layout>
    </div>
  );
};

export default Home;
