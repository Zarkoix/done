/**
 * Convert a Javscript Date object to just the time for sending to the server
 * Returned in format 'HH:MM'
 */
export function jsDateToTime(date) {
  let hours = preFixZero(date.getHours());
  let minutes = preFixZero(date.getMinutes());
  return hours + ":" + minutes;
}

/**
 * Convert a Javscript Date object to just the date for sending to the server
 * Returned in format 'YYYY-MM-DD'
 */
export function jsDateToDate(date) {
  let year = date.getYear();
  let months = preFixZero(date.getMonths());
  let days = preFixZero(date.getDays());
  return year + "-" + minutes + "-" + days;
}

/**
 * Prefixes a '0' to the number if less than 10
 * Returns a string
 */
export function prefixZero(number) {
  return (number < 10 ? "0" : "") + number;
}
