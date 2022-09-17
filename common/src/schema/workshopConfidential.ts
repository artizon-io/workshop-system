import { array, number, object, string, infer as zInfer } from "zod";
import { UserSchemaLibrary } from "./user";

export type WorkshopConfidential = zInfer<typeof WorkshopConfidentialSchema>;

export const WorkshopConfidentialSchemaLibrary = {
  current: number().int().min(0),
  enrolls: {
    id: string().uuid(),
    firstName: string(),
    lastName: string(),
    phone: UserSchemaLibrary.phone,
    email: string().email(),
    paymentStatus: string().regex(/(paid)|(unpaid)/),
    stripePaymentId: string().uuid(),
  }
};

export const WorkshopConfidentialSchema = object({
  current: WorkshopConfidentialSchemaLibrary.current,
  enrolls: array(object({
    id: WorkshopConfidentialSchemaLibrary.enrolls.id,
    firstName: WorkshopConfidentialSchemaLibrary.enrolls.firstName.optional(),
    lastName: WorkshopConfidentialSchemaLibrary.enrolls.lastName.optional(),
    phone: WorkshopConfidentialSchemaLibrary.enrolls.phone.optional(),
    email: WorkshopConfidentialSchemaLibrary.enrolls.email.optional(),
    paymentStatus: WorkshopConfidentialSchemaLibrary.enrolls.paymentStatus,
    stripePaymentId: WorkshopConfidentialSchemaLibrary.enrolls.stripePaymentId
  }))
});