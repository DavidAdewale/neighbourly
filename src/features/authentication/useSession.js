import { useQuery } from '@tanstack/react-query';
import { getCurrentSession } from '../../services/apiAuth';

export function useSession() {
  const { isLoading, data: session } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  return { isLoading, session };
}
