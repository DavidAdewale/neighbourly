import { useMutation } from '@tanstack/react-query';
import { uploadFinance } from '../../services/apiFinances';

export function useUpdateFinance() {
  const { mutate: updateFinance, isLoading: isUpdating } = useMutation({
    mutationFn: (id) => uploadFinance(id),
  });

  return { updateFinance, isUpdating };
}
