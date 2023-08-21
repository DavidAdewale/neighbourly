import { useQuery } from '@tanstack/react-query';
import { getFinances } from '../../services/apiFinances';

export function useFinances(id) {
  const { data: records, isLoading: isLoadingRecords } = useQuery({
    queryKey: ['finances', id],
    queryFn: () => getFinances(id),
  });

  return { records, isLoadingRecords };
}
