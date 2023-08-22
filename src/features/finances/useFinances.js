import { useQuery } from '@tanstack/react-query';
import { getFinances } from '../../services/apiFinances';
import { useSearchParams } from 'react-router-dom';

export function useFinances(id) {
  const [searchParams] = useSearchParams();

  //filter by category
  const categoryFilter = searchParams.get('category');
  const categoryStatus =
    !categoryFilter || categoryFilter === 'all'
      ? null
      : { field: 'category', value: categoryFilter };

  //sort
  const sortFilter = searchParams.get('sort') || 'created_at-desc';
  const [field, direction] = sortFilter.split('-') || '';
  const sort = { field, direction };

  const { data: records, isLoading: isLoadingRecords } = useQuery({
    queryKey: ['finances', id, categoryStatus, sort],
    queryFn: () => getFinances({ id, categoryStatus, sort }),
  });

  return { records, isLoadingRecords };
}
