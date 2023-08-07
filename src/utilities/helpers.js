import { intervalToDuration, intlFormatDistance } from 'date-fns';

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
  const start = new Date(startDate);
  const end = new Date(endDate);

  const duration = intervalToDuration({ start, end });
  const { years, months, weeks, days } = duration;

  let formattedDistance;

  if (years >= 1) {
    formattedDistance = `${years} year${years > 1 ? 's' : ''}`;
  } else if (months >= 1) {
    formattedDistance = `${months} month${months > 1 ? 's' : ''}`;
  } else if (weeks >= 1) {
    formattedDistance = `${weeks} week${weeks > 1 ? 's' : ''}`;
  } else {
    formattedDistance = `${days} day${days > 1 ? 's' : ''}`;
  }

  return formattedDistance;
}
