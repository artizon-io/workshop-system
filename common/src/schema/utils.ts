import { array, object, string } from "zod";


export type Optional<T> = T | null | undefined;

export const idSchema = string().regex(/^[a-z0-9]{20}$/i);