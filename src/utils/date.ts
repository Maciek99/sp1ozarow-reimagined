export function parseMonth(month: string): number {
  switch(month) {
    case "stycznia":
      return 0;
    case "lutego":
      return 1;
    case "marca": 
      return 2;
    case "kwietnia":
      return 3;
    case "maja":
      return 4;
    case "czerwca":
      return 5;
    case "lipca":
      return 6;
    case "sierpnia":
      return 7;
    case "września":
      return 8;
    case "października":
      return 9;
    case "listopada":
      return 10;
    case "grudnia":
      return 11;
    default:
      throw new Error('Invalid month string');
  }
}

export function dateStringToDate(dateString: string, hourString: string): Date {
  // date string format: DD month YYYY
  // example: 12 stycznia 2021
  const dateParts = dateString.split(' ');
  const day = parseInt(dateParts[0]);
  const month = parseMonth(dateParts[1]);
  const year = parseInt(dateParts[2]);

  const hourParts = hourString.split(':');
  const hour = parseInt(hourParts[0]);
  const minute = parseInt(hourParts[1]);

  return new Date(year, month, day, hour, minute);
}