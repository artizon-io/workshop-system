import { WorkshopConfidentialSchemaLibrary } from "@mingsumsze/common";
import { number, object, string } from "zod";

export interface stripeMetadata {
  workshopId: string;
  enrollId: string;
}

export const StripeMetadataSchema = object({
  workshopId: string().uuid(),
  enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id
});