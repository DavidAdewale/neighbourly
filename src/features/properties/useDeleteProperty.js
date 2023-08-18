import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProperty as deletePropertyApi } from '../../services/apiProperties';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteProperty, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deletePropertyApi(id),
    onSuccess: () => {
      toast.success('Property Deleted');
      queryClient.invalidateQueries['properties'];
      navigate('/properties');
    },
    onError: () => toast.error('Could not delete property'),
  });

  return { deleteProperty, isDeleting };
}
