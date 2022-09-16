import { Timestamp } from "firebase/firestore";
import { BaseSchema, date, mixed, number, object, string } from "yup";
import { Schema } from "./utils";

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
  datetime: mixed().test({
    test: (value, context) => {
      // console.debug(`Value: ${value}, ${typeof value}`);
      // if (!(value instanceof Timestamp))  // different firebase/firestore might be loaded, so couldn't rely on this
      // See: https://stackoverflow.com/questions/53092547/instanceof-returns-false-for-same-class-after-serialization
      if (!(value instanceof Object))
        return context.createError();
      if (value.constructor.name != "Timestamp")
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

  return (object({
    title: title.required(),
    datetime: datetime.required(),
    description: description.required(),
    duration: duration.required(),
    language: language.required(),
    capacity: capacity.required(),
    fee: fee.required(),
    venue: venue.required(),
  })).validate(data);
}