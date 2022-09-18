// import { Timestamp } from "firebase/firestore";
// import { Timestamp } from "firebase-admin/firestore";

let Timestamp;

import("firebase/firestore")
  .then(mod => Timestamp = mod.Timestamp)
  .catch(err => {
    console.info('Fail to load firebase/firestore');
    console.info('Trying to load firebase-admin/firestore');
    import("firebase-admin/firestore")
      .then(mod => Timestamp = mod.Timestamp)
      .catch(err => {
        console.error('Fail to load firebase-admin/firestore');
      });
  });
  
import { date, number, object, string, instanceof as zInstanceof, infer as zInfer, unknown, any, custom, undefined } from "zod";

export type Workshop = zInfer<typeof WorkshopSchema>;

export const WorkshopSchemaLibrary = {
  title: string().min(1),
  description: string().min(1),
  datetime: Timestamp ? zInstanceof(Timestamp) : undefined(),
  datetimeStr: string().refine(val => {
    const result = Date.parse(val);
    // console.debug(result);
    // console.debug(new Date(result).toISOString());
    return !isNaN(result);
  }, {
    message: "String is not in valid ISO datetime format"
  }),
  duration: number().positive(),
  language: string().min(1),
  capacity: number().positive(),
  fee: number().min(0),
  venue: string().min(1),
}

export const WorkshopSchema = object({
  title: WorkshopSchemaLibrary.title,
  datetime: WorkshopSchemaLibrary.datetime,
  description: WorkshopSchemaLibrary.description,
  duration: WorkshopSchemaLibrary.duration,
  language: WorkshopSchemaLibrary.language,
  capacity: WorkshopSchemaLibrary.capacity,
  fee: WorkshopSchemaLibrary.fee,
  venue: WorkshopSchemaLibrary.venue,
});