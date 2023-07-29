import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../services/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isLoggingOut };
}
