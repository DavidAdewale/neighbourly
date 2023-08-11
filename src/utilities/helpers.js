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

export function formatDateDistance(endDate) {
  const currentDate = new Date();
  const end = endDate ? new Date(endDate) : new Date();

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

export function checkPropertyStatus(apartmentsData) {
  let hasOccupied = false;
  let hasVacant = false;

  for (const apartment of apartmentsData) {
    if (apartment.occupancyStatus === 'occupied') {
      hasOccupied = true;
    } else if (apartment.occupancyStatus === 'vacant') {
      hasVacant = true;
    }
  }

  if (hasOccupied && hasVacant) {
    return 'partially-occupied';
  } else if (!hasOccupied && hasVacant) {
    return 'vacant';
  } else if (hasOccupied && !hasVacant) {
    return 'occupied';
  } else {
    return 'unknown';
  }
}

export function accumulateIncome(data, income) {
  const accumulated = data.reduce((sum, cur) => (sum += +cur[income]), 0);
  return accumulated;
}

//The updateSequence helper function only works with useMutation functions
export function updateSequence(fn, arr, message, navigate) {
  const lastCall = arr.at(-1);
  const otherElements = arr.slice(0, -1);
  otherElements.forEach((el) => fn(el));
  fn(lastCall, {
    onSettled: () => {
      message;
      navigate;
    },
  });
}
