import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signin as signinApi } from '../services/apiAuth';

export function useSignin() {
  const queryClient = useQueryClient();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      signinApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => console.log('Error', err),
  });

  return { signin, isLoading };
}
