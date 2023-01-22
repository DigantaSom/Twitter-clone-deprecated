import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';

import usePersist from '../../hooks/usePersist';
import { useRefreshMutation } from './auth-api.slice';
import { selectIsAuthenticated } from './auth.slice';

import Explore from '../../components/Explore';

interface PersistLoginProps {
  children: JSX.Element;
}

const PersistLogin: FC<PersistLoginProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // trueSuccess is used to give enough time to set the credentials (auth.slice.js' setCredenitals action creator)
  const [trueSuccess, setTrueSuccess] = useState(false);
  const persist = usePersist();
  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log('Verifying refresh token');
      try {
        await refresh(undefined);
        console.log('refresh token generation success');
        setTrueSuccess(true);
      } catch (err) {
        console.log('Error while fetching the refresh token:', err);
      }
    };
    if (!isAuthenticated && persist) {
      verifyRefreshToken();
    }
  }, []);

  let content;

  if (!persist) {
    // persist: false
    content = <Explore />;
  } else if (isLoading) {
    // persist: true, isAuthenticated: false
    content = <PulseLoader color='#fff' />;
  } else if (isError) {
    // persist: true, isAuthenticated: false
    console.log(error);
    content = <Explore />;
  } else if (isSuccess && trueSuccess) {
    // persist: true, isAuthenticated: true
    content = children;
  } else {
    // On first login/signup (no refresh)
    content = children;
  }

  return <>{content}</>;
};

export default PersistLogin;
