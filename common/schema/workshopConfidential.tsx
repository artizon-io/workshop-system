import { number, object, string } from "yup";

export interface WorkshopConfidential {
  current: number;
  enrolls: Array<{
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    paymentStatus: "paid" | "unpaid";
    stripePaymentId?: string;
  }>
}

export interface WorkshopConfidentialWithId extends WorkshopConfidential {
  id: string;
}

export const validateWorkshopConfidential = (data : any) => object({
  current: number().integer().min(0),
  enrolls: object({
    id: string().uuid(),
    firstName: string().optional(),
    lastName: string().optional(),
    phone: string().optional().matches(/\+852\d{8}/),
    email: string().optional().email(),
    paymentStatus: string().matches(/(paid)|(unpaid)/),
    stripePaymentId: string().optional().uuid()
  })
}).validate(data);