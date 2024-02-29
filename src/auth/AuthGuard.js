import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
  allowedUserTypes: PropTypes.arrayOf(PropTypes.string),
};

export default function AuthGuard({ children, allowedUserTypes }) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!user && !isInitialized) {
    return <LoadingScreen />;
  }
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (
    (isAuthenticated,
    allowedUserTypes,
    allowedUserTypes.length > 0,
    !allowedUserTypes.includes(user?.role))
  ) {
    return <Navigate to="/403" />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
