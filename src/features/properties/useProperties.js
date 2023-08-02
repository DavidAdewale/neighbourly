import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getProperties } from '../../services/apiProperties';

export function useProperties() {
  const { user } = useUser();
  const id = user.id;
  const {
    isLoading,
    data: properties,
    error,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(id),
  });

  return { isLoading, properties, error };
}
