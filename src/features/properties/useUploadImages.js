import { useMutation } from '@tanstack/react-query';
import { uploadImages as uploadImagesApi } from '../../services/apiProperties';
import { toast } from 'react-hot-toast';

export function useUploadImages() {
  const { uploadImages, isUploading } = useMutation({
    mutationFn: async (imgArr, id) => {
      const result = await uploadImagesApi(imgArr, id);
      return result;
    },
    onSuccess: () => {
      toast.success('Upload successful');
    },
    onError: () => {
      toast.error('Failed to upload');
    },
  });

  return { uploadImages, isUploading };
}
