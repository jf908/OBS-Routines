export function formatMs(value: number) {
  value /= 1000;
  const hours = Math.floor(value / 3600);
  value -= hours * 3600;
  const minutes = Math.floor(value / 60);
  const seconds = value - minutes * 60;

  if (hours) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}

export function formatTime(time: number, twelveHour = false) {
  let secs = time / 1000;
  const hours = Math.floor(secs / 3600);
  secs -= hours * 3600;
  const minutes = Math.floor(secs / 60);
  // const seconds = secs - minutes * 60;

  if (twelveHour) {
    let am = hours === 0 ? false : hours < 12;
    return `${(((hours + 11) % 12) + 1).toString()}:${minutes
      .toString()
      .padStart(2, '0')} ${am ? 'AM' : 'PM'}`;
  } else {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }
}

/**
 * Provide a time from 00:00 to 23:59:59.999
 * @param time in milliseconds from 00:00
 * @returns milliseconds until time
 */
export function getTimeUntil(time: number, now: Date) {
  let secs = time / 1000;
  const hours = Math.floor(secs / 3600);
  secs -= hours * 3600;
  const minutes = Math.floor(secs / 60);
  const seconds = secs - minutes * 60;

  const date = new Date(now);
  date.setHours(hours, minutes, seconds);
  let timeUntil = date.getTime() - now.getTime();

  if (timeUntil < 0) {
    date.setDate(date.getDate() + 1);
    date.setHours(hours, minutes, seconds);
    timeUntil = date.getTime() - now.getTime();
  }

  return timeUntil;
}
