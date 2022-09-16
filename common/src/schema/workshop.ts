import { Timestamp } from "firebase/firestore";
import { BaseSchema, date, number, object, string } from "yup";
import { constructSchema, Schema } from "./utils";

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
  id: string;
}

export const WorkshopSchema = {
  title: string().min(1),
  description: string().min(1),
  datetime: date().test({
    test: (value, context) => {
      if (!(value instanceof Timestamp))
        return context.createError();
      return true;
    }
  }),
  duration: number().positive(),
  language: string().min(1),
  capacity: number().positive(),
  fee: number().min(0),
  venue: string().min(1),
}

export const validateWorkshop = (data: any) => {
  const {
    title, description, datetime, duration, language, capacity, fee, venue
  } = WorkshopSchema;

  return (constructSchema({
    title,
    description,
    datetime,
    duration,
    language,
    capacity,
    fee,
    venue,
  })).validate(data);
}