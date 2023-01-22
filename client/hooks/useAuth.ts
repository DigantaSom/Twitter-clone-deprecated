import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { TokenPayload } from '../types';
import { selectCurrentToken } from '../features/auth/auth.slice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded: TokenPayload = jwtDecode(token);
    return { isAuth: true, ...decoded.user };
  }
  return { isAuth: false };
};

export default useAuth;
