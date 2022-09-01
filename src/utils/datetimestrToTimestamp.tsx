import { Timestamp } from "firebase/firestore";

export function datetimestrToTimestamp(date: string, time: string) : Timestamp {
  const [month, day, year] = date.split('/');
  const [hours, minutes, seconds] = time.split(':');

  return Timestamp.fromDate(new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds)));
}