import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateHouseTenant as updateHouseTenantApi } from '../../services/apiProperties';

export function useEditHouseTenant() {
  const queryClient = useQueryClient();
  const { mutate: updateHouseTenant, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => {
      const newData = data.at(0);
      const id = data.at(1);
      updateHouseTenantApi(newData, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
      toast.success('Tenant updated!');
    },
  });

  return { updateHouseTenant, isUpdating };
}
