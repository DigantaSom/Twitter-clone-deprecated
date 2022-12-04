import { FC } from 'react';

import Navigation from './Navigation';
import Trending from './Trending';
import ComposeTweet from './ComposeTweet';
import DarkOverlay from './DarkOverlay';
import TweetComposeButton from './TweetComposeButton';
import BottomNavigation from './BottomNavigation';

import { useAppSelector } from '../hooks';

interface LayoutProps {
  children: JSX.Element[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const isComposeTweetShown = useAppSelector(
    state => state.ui.isComposeTweetShown
  );

  return (
    <div className='relative'>
      {isComposeTweetShown && (
        <div className='absolute z-50 top-0 left-0 ph:top-8 ph:left-[50%] ph:-translate-x-[50%]'>
          <ComposeTweet />
        </div>
      )}

      {isComposeTweetShown && <DarkOverlay />}
      <div className='max-w-[664px] md2:max-w-[90vw] xl:max-w-7xl m-auto flex h-screen'>
        <div className='hidden ph:block w-16 xl:w-[20%] border-r-[1px] border-gray-200'>
          <Navigation />
        </div>
        <div className='flex-1 xl:w-[75%] flex'>
          <div className='w-full md:min-w-[600px] overflow-y-scroll'>
            <div className='ph:border-r-[1px] ph:border-gray-200'>
              {children}
            </div>
          </div>
          <Trending />
        </div>
      </div>

      <div className='ph:hidden absolute bottom-20 right-2 ph_sm:right-4 z-30'>
        <TweetComposeButton from='App' />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Layout;
