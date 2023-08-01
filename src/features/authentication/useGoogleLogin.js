import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle } from '../../services/apiAuth';

export function useGoogleLogin() {
  const queryClient = useQueryClient();
  const { mutate: signin, isLoading } = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => console.log('Error', err),
  });

  return { signin, isLoading };
}
