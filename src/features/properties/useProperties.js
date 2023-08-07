import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getProperties } from '../../services/apiProperties';
import { useSearchParams } from 'react-router-dom';

export function useProperties() {
  // const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const { user } = useUser();
  const id = user.id;

  //filter
  const occupancyFilter = searchParams.get('status');
  const occupancyStatus =
    !occupancyFilter || occupancyFilter === 'all'
      ? null
      : { field: 'occupancyStatus', value: occupancyFilter };

  const propertyTypeFilter = searchParams.get('type');

  const propertyType =
    !propertyTypeFilter || propertyTypeFilter === 'all'
      ? null
      : { field: 'propertyCategory', value: propertyTypeFilter };

  // SORT
  const sort = searchParams.get('sortBy') || 'created_at-asc';
  const [field, direction] = sort.split('-') || '';
  const sortBy = { field, direction };

  const {
    isLoading,
    data: properties,
    error,
  } = useQuery({
    queryKey: ['properties', occupancyStatus, propertyType, sortBy],
    queryFn: () => getProperties({ id, occupancyStatus, propertyType, sortBy }),
  });

  return { isLoading, properties, error };
}
