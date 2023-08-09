import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProperty as updatePropertyApi } from '../../services/apiProperties';

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  const { mutate: updateProperty, isLoading: isUpdating } = useMutation({
    mutationFn: (args) => {
      const columnName = args.at(0);
      const payload = args.at(1);
      const id = args.at(2);
      updatePropertyApi(columnName, payload, id);
    },
    onSuccess: () => {
      // toast.success('Property successfully added!');
      queryClient.invalidateQueries(['properties']);
    },
    onError: (err) => toast.error('Failed to upload', err.message),
  });

  return { updateProperty, isUpdating };
}
