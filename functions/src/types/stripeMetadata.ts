import { number, object, string } from "yup";

export interface stripeMetadata {
  workshopId: string;
  enrollId: string;
}

export const validateStripeMetadata = (data : any) => object({
  workshopId: string().uuid(),
  enrollId: string().uuid()
}).validate(data);