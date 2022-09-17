import { string } from "yup";

export const sessionIdSchema = string().uuid();