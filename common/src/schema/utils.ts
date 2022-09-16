import { BaseSchema, object, ObjectSchema, string } from "yup";


export type Optional<T> = T | null | undefined;

export type Schema = {[field: string]: any};

export const constructSchema = (obj: {[field: string]: BaseSchema | Object}, maxDepth: number = 3) : ObjectSchema<any> => {
  if (maxDepth <= 0)
    throw Error('constructSchema reaches predefined max depth');

  let temp : {[field: string]: BaseSchema | ObjectSchema<any>} = {};
  for (let [field, schema] of Object.entries(obj)) {
    if (!(schema instanceof BaseSchema))
      temp[field] = constructSchema(obj, maxDepth-1);
    else
      temp[field] = schema;
  }
  return object(temp);
}

export const idSchema = string().uuid();