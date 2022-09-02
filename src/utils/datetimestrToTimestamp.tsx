import { Timestamp } from "firebase/firestore";

export function datetimestrToTimestamp(date: string, time: string) : Timestamp {
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');

  return Timestamp.fromDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes)));
}