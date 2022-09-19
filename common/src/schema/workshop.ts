import { Timestamp } from "firebase/firestore";
// import { Timestamp } from "firebase-admin/firestore";

// Deprecated
// let datetimeSchema : ZodSchema = any();

// import("firebase/firestore")
//   .then(mod => {
//     const Timestamp = mod.Timestamp;
//     datetimeSchema = zInstanceof(Timestamp);
//   })
//   .catch(err => {
//     console.info('Fail to load firebase/firestore');
//     console.info('Trying to load firebase-admin/firestore');
//     import("firebase-admin/firestore")
//       .then(mod => {
//         const Timestamp = mod.Timestamp;
//         datetimeSchema = zInstanceof(Timestamp);
//       })
//       .catch(err => {
//         console.error('Fail to load firebase-admin/firestore');
//       });
//   });
  
import { date, number, object, string, instanceof as zInstanceof, infer as zInfer, unknown, any, custom, undefined, ZodAny, ZodObject, ZodSchema } from "zod";

export type Workshop = zInfer<typeof WorkshopSchema>;

export const WorkshopSchemaLibrary = {
  title: string().min(1),
  description: string().min(1),
  // datetime: Timestamp ? zInstanceof(Timestamp) : undefined(),
  // datetime: string().refine(val => {
  //   const result = new Date(val);
  //   // console.debug(result);
  //   // console.debug(result.toISOString());
  //   return result instanceof Date && !isNaN(result.valueOf());  // could be NaN
  // }, {
  //   message: "String is not in valid ISO datetime format"
  // }),
  datetime: any().refine((v) : v is Timestamp => {
    if (v == null)
      return false;

    // compare between v and Timestamp.prototype
    if (!(v instanceof Object))
      return false;
    
    Object.keys(Timestamp.prototype).forEach(key => {
      if (!(key in v))
        return false;
    });
    return true;
  }, { message: 'datetime is not a firestore Timestamp' }),
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