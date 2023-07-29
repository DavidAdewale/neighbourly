import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signin as signinApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useSignin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      signinApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Sign in successful!');
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { signin, isLoading };
}
