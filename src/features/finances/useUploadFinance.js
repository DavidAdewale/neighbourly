import { useMutation } from '@tanstack/react-query';
import { uploadFinance as uploadFinanceApi } from '../../services/apiFinances';

export function useUploadFinance() {
  const { mutate: uploadFinance, isLoading: isUploading } = useMutation({
    mutationFn: (id) => uploadFinanceApi(id),
  });

  return { uploadFinance, isUploading };
}
