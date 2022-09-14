import { Timestamp } from "firebase/firestore";
import yup, { date, number, object, string } from "yup";

export interface Workshop {
  title: string;
  description: string;
  datetime: Timestamp;
  duration: number;
  language: string;
  capacity: number;
  fee: number;
  venue: string;
}

export interface WorkshopWithId extends Workshop {
  id: string
}

export const validateWorkshopConfidential = (data : any) => object({
  title: string().min(1),
  description: string().min(1),
  datetime: date().test({
    test(value, context) {
      if (!(value instanceof Timestamp))
        return context.createError();
    }
  }),
  duration: number().positive(),
  language: string().min(1),
  capacity: number().positive(),
  fee: number().min(0),
  venue: string().min(1),
}).validate(data);