import { string } from "zod";

export const sessionIdSchema = string().uuid();