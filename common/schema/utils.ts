import { BaseSchema, object, ObjectSchema, string } from "yup";

// export type MustOrOptional = "must" | "optional";

// export type DeriveType<T extends (MustOrOptional | null | undefined), V extends any> =
//   T extends "must" ? V :
//   T extends "optional" ? (V | null | undefined) :
//   never;

// export type DeriveInterfaceType<T extends any, V extends any> =
//   T extends NonNullable<any> ? V :
//   never;

// export const deriveSchema = (type: MustOrOptional | null | undefined, schema: BaseSchema) =>
//   type === "must" ? schema:
//   type === "optional" ? schema.optional():
//   null;

// export const deriveObjectSchema = (type: Object | null | undefined, schema: BaseSchema) =>
//   type === Object ? schema:
//   null;

export type Optional<T> = T | "null" | "undefined";

export type Schema = {[field: string]: any};

export const constructSchema = (obj: {[field: string]: BaseSchema | Object}, maxDepth: number = 3) : ObjectSchema<any> => {
  if (maxDepth <= 0)
    throw Error('constructSchema reaches predefined max depth');

  let temp = {};
  for (let [field, schema] of Object.entries(obj)) {
    if (!(schema instanceof BaseSchema))
      schema = constructSchema(obj, maxDepth-1);
    temp[field] = schema;
  }
  return object(temp);
}

export const idSchema = string().uuid();