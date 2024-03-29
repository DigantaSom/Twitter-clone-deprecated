import { FC } from 'react';

import Navigation from './Navigation';
import Trending from '../features/trending/Trending';
import SignUp from '../features/auth/SignUp';
import DarkOverlay from './DarkOverlay';
import ComposeTweet from '../features/tweet/ComposeTweet';
import AuthModal from '../features/auth/AuthModal';
import TweetComposeButton from './TweetComposeButton';
import BottomNavigation from './BottomNavigation';
import BottomAuth from '../features/auth/BottomAuth';

import { useAppSelector } from '../hooks/redux-hooks';
import { selectIsAuthenticated } from '../features/auth/auth.slice';
import {
  selectIsComposeTweetShown,
  selectAuthModal,
} from '../features/ui/ui.slice';

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isComposeTweetShown = useAppSelector(selectIsComposeTweetShown);
  const authModal = useAppSelector(selectAuthModal);

  return (
    <div className='relative'>
      {isComposeTweetShown && (
        <div className='absolute z-50 top-0 left-0 ph:top-8 ph:left-[50%] ph:-translate-x-[50%]'>
          <ComposeTweet />
        </div>
      )}

      {authModal.isShown && (
        <div className='absolute z-50 top-0 bottom-0 ph:top-10 ph:bottom-10 left-0 ph:left-[50%] ph:-translate-x-[50%]'>
          <AuthModal modalType={authModal.type} />
        </div>
      )}

      {(isComposeTweetShown || authModal.isShown) && <DarkOverlay />}
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
          <div className='hidden md2:block w-full pl-6 lg:pl-3 pb-14 overflow-y-scroll'>
            {isAuthenticated ? <Trending /> : <SignUp />}
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className='ph:hidden absolute bottom-20 right-2 ph_sm:right-4 z-30'>
          <TweetComposeButton from='App' />
        </div>
      )}

      {isAuthenticated && <BottomNavigation />}

      {!isAuthenticated && <BottomAuth />}
    </div>
  );
};

export default Layout;
