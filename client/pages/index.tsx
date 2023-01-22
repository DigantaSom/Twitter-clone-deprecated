import Head from 'next/head';
import dynamic from 'next/dynamic';

import PersistLogin from '../features/auth/PersistLogin';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Explore from '../components/Explore';

const Home = () => {
  let persist = false;

  if (typeof window !== 'undefined') {
    persist = !!localStorage.getItem('persist');
  }

  return (
    <div>
      <Head>
        <title>Home / Twitter</title>
        <meta name='description' content='Twitter - Home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        {persist ? (
          <PersistLogin>
            <>
              <Header />
              <Feed />
            </>
          </PersistLogin>
        ) : (
          <Explore />
        )}
      </Layout>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
