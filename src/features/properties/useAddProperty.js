import { useMutation } from '@tanstack/react-query';
import { uploadProperty } from '../../services/apiProperties';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useAddProperty() {
  const navigate = useNavigate();
  const { mutate: addProperty, isLoading: isAdding } = useMutation({
    mutationFn: (property) => uploadProperty(property),
    onSuccess: () => {
      toast.success('Property successfully added!');
      navigate(`/properties`);
    },
    onError: (err) => toast.error('Failed to upload', err.message),
  });

  return { addProperty, isAdding };
}
