import { string } from "zod";

export const UserSchemaLibrary = {
  phone: string().regex(/^\+852\d{8}$/)
}