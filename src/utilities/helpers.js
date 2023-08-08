import { formatDistanceToNow, intervalToDuration } from 'date-fns';

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'NGN' }).format(
    value
  );

export function capitalizeFirstLetter(str) {
  const stringArray = str.split(/-| /);

  if (stringArray.length >= 2) {
    const newArray = stringArray.map(
      (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
    return newArray.join(' ');
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDateDistance(startDate, endDate) {
  const currentDate = new Date();
  const end = new Date(endDate);

  const isPast = end < currentDate;

  let formattedDistance;

  if (isPast) {
    formattedDistance = `Exp. ${formatDistanceToNow(end)} ago`;
  } else {
    const duration = intervalToDuration({ start: currentDate, end });
    const { years, months, weeks, days } = duration;

    if (years >= 1) {
      formattedDistance = `In ${years} year${years > 1 ? 's' : ''}`;
    } else if (months >= 1) {
      formattedDistance = `In ${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks >= 1) {
      formattedDistance = `In ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      formattedDistance = `In ${days} day${days > 1 ? 's' : ''}`;
    }
  }

  return formattedDistance;
}
