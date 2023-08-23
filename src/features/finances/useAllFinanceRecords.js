import { useQuery } from '@tanstack/react-query';
import { getAllFinanceRecords } from '../../services/apiFinances';

export function useAllFinanceRecords(id) {
  const { data: allRecords, isLoading: isLoadingAllRecords } = useQuery({
    queryKey: ['allRecords'],
    queryFn: () => getAllFinanceRecords(id),
  });

  return { allRecords, isLoadingAllRecords };
}
