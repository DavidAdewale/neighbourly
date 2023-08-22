import { useMutation } from '@tanstack/react-query';
import { uploadFinance as uploadFinanceApi } from '../../services/apiFinances';

export function useUploadFinance() {
  const { mutate: uploadFinance, isLoading: isUploading } = useMutation({
    mutationFn: (data) => uploadFinanceApi(data),
  });

  return { uploadFinance, isUploading };
}
