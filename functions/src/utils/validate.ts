import { object, ZodError, ZodTypeAny, infer as zInfer, ZodIssue } from "zod";


export const validate = <T extends ZodTypeAny>(schema: T, body: any) : {data: zInfer<T>, issues: null} | {data: null, issues: ZodIssue[]} => {
  const result = schema.safeParse(body);
  if (!result.success) {
    return {data: null, issues: result.error.issues};
  } else {
    return {data: result.data, issues: null};
  }
}