import { useQuery } from '@tanstack/react-query';
import { getFinances } from '../../services/apiFinances';
import { useSearchParams } from 'react-router-dom';
import {
  format,
  startOfYear,
  subMonths,
  subQuarters,
  subYears,
} from 'date-fns';

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

  const { data: records, isLoading: isLoadingRecords } = useQuery({
    queryKey: ['finances', id, categoryStatus, sort, timeInterval],
    queryFn: () => getFinances({ id, categoryStatus, sort, timeInterval }),
  });

  return { records, isLoadingRecords };
}
