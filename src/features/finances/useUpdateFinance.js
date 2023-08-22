import { useMutation } from '@tanstack/react-query';
import { updateFinance as updateFinanceApi } from '../../services/apiFinances';
import { toast } from 'react-hot-toast';

export function useUpdateFinance() {
  const { mutate: updateFinance, isLoading: isUpdating } = useMutation({
    mutationFn: ({ data, id }) => updateFinanceApi(data, id),
    onSuccess: () => toast.success('Record updated'),
    onError: () => toast.error('Failed to update'),
  });

  return { updateFinance, isUpdating };
}
