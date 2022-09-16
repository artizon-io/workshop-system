import { BaseSchema, number, object, string } from "yup";
import { UserSchema } from "./user";
import { constructSchema } from "./utils";

export interface WorkshopConfidential {
  current: number;
  enrolls: Array<{
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    paymentStatus?: "paid" | "unpaid";
    stripePaymentId?: string;
  }>
}

export interface WorkshopConfidentialWithId extends WorkshopConfidential {
  id: string;
}

export const WorkshopConfidentialSchema = {
  current: number().integer().min(0),
  enrolls: {
    id: string().uuid(),
    firstName: string(),
    lastName: string(),
    phone: UserSchema.phone,
    email: string().email(),
    paymentStatus: string().matches(/(paid)|(unpaid)/),
    stripePaymentId: string().uuid(),
  }
};

export const validateWorkshopConfidential = (data: any) => {
  const {
    current, 
    enrolls: {
      id, firstName, lastName, phone, email, paymentStatus, stripePaymentId
    }
  } = WorkshopConfidentialSchema;

  return (constructSchema({
    current,
    enrolls: {
      id,
      firstName: firstName.optional(),
      lastName: lastName.optional(),
      phone: phone.optional(),
      email: email.optional(),
      paymentStatus,
      stripePaymentId: stripePaymentId.optional()
    }
  })).validate(data);
}