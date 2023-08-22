import { useMutation } from '@tanstack/react-query';
import { deleteRecord as deleteRecordApi } from '../../services/apiFinances';
import { toast } from 'react-hot-toast';

export function useDeleteRecord() {
  const { mutate: deleteRecord, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteRecordApi(id),
    onSuccess: () => toast.success('Record deleted'),
    onError: () => toast.error('Could not delete record'),
  });

  return { deleteRecord, isDeleting };
}
