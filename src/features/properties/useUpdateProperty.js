import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProperty as updateProperyApi } from '../../services/apiProperties';

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  const { mutate: updateProperty, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => {
      const newData = data.at(0);
      const id = data.at(1);
      updateProperyApi(newData, id);
    },
    onSuccess: () => {
      toast.success('Property updated!');
      queryClient.invalidateQueries(['properties']);
    },
  });

  return { updateProperty, isUpdating };
}
