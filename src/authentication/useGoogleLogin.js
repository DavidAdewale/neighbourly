import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useGoogleLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/signin');
    },
    onError: (err) => console.log('Error', err),
  });

  return { signin, isLoading };
}
