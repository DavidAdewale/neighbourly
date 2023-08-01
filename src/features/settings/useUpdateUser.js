import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updatedUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (user) => {
      toast.success('User account successfully updated');
      console.log(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatedUser, isUpdating };
}
