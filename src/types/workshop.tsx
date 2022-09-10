import { Timestamp } from "firebase/firestore";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  datetime: Timestamp;
  duration: number;
  language: string;
  capacity: number;
  fee: number;
  venue: string;
  mapsrc: string;
}