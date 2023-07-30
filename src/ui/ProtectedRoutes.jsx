import { useNavigate } from 'react-router-dom';
import { useUser } from '../authentication/useUser';
import { useEffect } from 'react';
import FullPageSpinner from './FullPageSpinner';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/signin');
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
