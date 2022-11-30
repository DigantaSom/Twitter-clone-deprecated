import { FC } from 'react';
import Head from 'next/head';

import Navigation from './Navigation';
import Trending from './Trending';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: JSX.Element[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='max-w-[664px] md2:max-w-[90vw] xl:max-w-7xl m-auto flex h-screen'>
        <div className='hidden ph:block w-16 xl:w-[20%] border-r-[1px] border-gray-200'>
          <Navigation />
        </div>
        <div className='flex-1 xl:w-[75%] flex overflow-y-scroll'>
          <div className='w-full md:min-w-[600px] py-2'>
            <div className='ph:border-r-[1px] ph:border-gray-200'>
              {children}
            </div>
          </div>
          <Trending />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Layout;
