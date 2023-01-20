import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Explore from '../components/Explore';

import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getCurrentUser } from '../redux/auth/auth.slice';

const Home = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

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
