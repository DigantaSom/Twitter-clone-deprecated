import { FC } from 'react';
import { useSelector } from 'react-redux';

import Navigation from './Navigation';
import Trending from './Trending';
import SignUp from './SignUp';
import DarkOverlay from './DarkOverlay';
import ComposeTweet from './ComposeTweet';
import AuthModal from './AuthModal';
import TweetComposeButton from './TweetComposeButton';
import BottomNavigation from './BottomNavigation';
import BottomAuth from './BottomAuth';

import { useAppSelector } from '../utils/hooks';
import { selectIsAuthenticated } from '../features/auth/auth.slice';

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isComposeTweetShown, authModal } = useAppSelector(state => state.ui);

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
