import { string } from "yup";

export const UserSchema = {
  phone: string().matches(/^\+852\d{8}$/)
}