export interface WorkshopConfidential {
  current: number;
  enrolls: Array<{
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    paymentStatus: string;
  }>
}