import { array, ArraySchema, BaseSchema, isSchema, NumberSchema, object, ObjectSchema, string } from "yup";


export type Optional<T> = T | null | undefined;

export type Schema = {[field: string]: BaseSchema | Schema};

// export const constructSchema = (obj: Schema, maxDepth: number = 3) : ObjectSchema<any> => {
//   if (maxDepth <= 0)
//     throw Error('constructSchema reaches predefined max depth');

//   // BaseSchema || Schema

//   let temp : Schema = {};
//   for (let [field, schema] of Object.entries(obj)) {
//     // console.debug(`${field}: ${typeof schema}, ${schema}`);
//     if (!isSchema(schema))
//       temp[field] = constructSchema(schema as Schema, maxDepth-1);
//     else
//       temp[field] = schema as BaseSchema;
//   }
//   return object(temp);
// }

export const idSchema = string().uuid();