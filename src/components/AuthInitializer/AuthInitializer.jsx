import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { selectToken, selectIsLoggedIn } from '../../redux/auth/selectors';

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn]);

  return null;
};

export default AuthInitializer;
