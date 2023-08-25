import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFinances } from '../../services/apiFinances';
import { useSearchParams } from 'react-router-dom';
import {
  format,
  startOfYear,
  subMonths,
  subQuarters,
  subYears,
} from 'date-fns';
import { PAGE_SIZE } from '../../utilities/config';

export function useFinances(id, fetchAll = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter by category
  const categoryFilter = searchParams.get('category');
  const categoryStatus =
    !categoryFilter || categoryFilter === 'all'
      ? null
      : { field: 'category', value: categoryFilter };

  //sort
  const sortFilter = searchParams.get('sort') || 'transactionDate-desc';
  const [field, direction] = sortFilter.split('-') || '';
  const sort = { field, direction };

  // Time intervals
  const currentDate = new Date();
  const currentDateString = format(currentDate, 'yyyy-MM-dd');

  const past6Months = subMonths(currentDate, 6);
  const pastQuarter = subQuarters(currentDate, 1);
  const pastTwoYears = subYears(currentDate, 2);
  const pastFiveYears = subYears(currentDate, 5);
  const currentYearStart = startOfYear(currentDate);

  let timeInterval = null;
  const timeIntervalParam = searchParams.get('timeInterval') || 'currentYear';
  switch (timeIntervalParam) {
    case 'currentYear':
      timeInterval = {
        startDate: format(currentYearStart, 'yyyy-MM-dd'),
        endDate: currentDateString,
      };
      break;
    case 'past6Months':
      timeInterval = {
        startDate: format(past6Months, 'yyyy-MM-dd'),
        endDate: currentDateString,
      };
      break;
    case 'pastQuarter':
      timeInterval = {
        startDate: format(pastQuarter, 'yyyy-MM-dd'),
        endDate: currentDateString,
      };
      break;
    case 'pastTwoYears':
      timeInterval = {
        startDate: format(pastTwoYears, 'yyyy-MM-dd'),
        endDate: currentDateString,
      };
      break;
    case 'pastFiveYears':
      timeInterval = {
        startDate: format(pastFiveYears, 'yyyy-MM-dd'),
        endDate: currentDateString,
      };
      break;
    case 'all':
      timeInterval = null;
      break;
    default:
      break;
  }

  //PAGINATION
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { isLoading, data: { finances: records, count } = {} } = useQuery({
    queryKey: [
      'finances',
      id,
      categoryStatus,
      sort,
      timeInterval,
      page,
      fetchAll,
    ],
    queryFn: () =>
      getFinances({ id, categoryStatus, sort, timeInterval, page, fetchAll }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (!fetchAll && page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        'finances',
        id,
        categoryStatus,
        sort,
        timeInterval,
        page + 1,
        fetchAll,
      ],
      queryFn: () =>
        getFinances({
          id,
          categoryStatus,
          sort,
          timeInterval,
          page: page + 1,
          fetchAll,
        }),
    });

  if (!fetchAll && page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        'finances',
        id,
        categoryStatus,
        sort,
        timeInterval,
        page - 1,
        fetchAll,
      ],
      queryFn: () =>
        getFinances({
          id,
          categoryStatus,
          sort,
          timeInterval,
          page: page - 1,
          fetchAll,
        }),
    });

  return { records, isLoadingRecords: isLoading, count };
}
