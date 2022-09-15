// import { BaseSchema, number, object, string } from "yup";
// import { DeriveInterfaceType, deriveObjectSchema, deriveSchema, DeriveType, MustOrOptional } from "./utils";

// interface Schema {
//   current?: MustOrOptional;
//   enrolls?: {
//     id?: MustOrOptional;
//     firstName?: MustOrOptional;
//     lastName?: MustOrOptional;
//     phone?: MustOrOptional;
//     email?: MustOrOptional;
//     paymentStatus?: MustOrOptional;
//     stripePaymentId?: MustOrOptional;
//   }
// }

// interface SchemaDefault extends Schema {
//   current: "must";
//   enrolls: {
//     id: "must";
//     firstName: "optional";
//     lastName: "optional";
//     phone: "optional";
//     email: "optional";
//     paymentStatus: "must";
//     stripePaymentId: "optional";
//   }
// }

// const SchemaDefaultOptions : Schema = {
//   current: "must",
//   enrolls: {
//     id: "must",
//     firstName: "optional",
//     lastName: "optional",
//     phone: "optional",
//     email: "optional",
//     paymentStatus: "must",
//     stripePaymentId: "optional",
//   }
// }

// export interface WorkshopConfidential<T extends Schema = SchemaDefault> {
//   current: DeriveType<T["current"], number>;
//   enrolls: DeriveInterfaceType<T["enrolls"], Array<{
//     id: DeriveType<T["enrolls"]["id"], string>;
//     firstName?: DeriveType<T["enrolls"]["firstName"], string>;
//     lastName?: DeriveType<T["enrolls"]["lastName"], string>;
//     phone?: DeriveType<T["enrolls"]["phone"], string>;
//     email?: DeriveType<T["enrolls"]["email"], string>;
//     paymentStatus: DeriveType<T["enrolls"]["paymentStatus"], "paid" | "unpaid">;
//     stripePaymentId?: DeriveType<T["enrolls"]["stripePaymentId"], string>;
//   }>>;
// }

// export interface WorkshopConfidentialWithId<T extends Schema = SchemaDefault> extends WorkshopConfidential<T> {
//   id: string;
// }

// export const validateWorkshopConfidential = (data : any, options: Schema = SchemaDefaultOptions) => object({
//   current: deriveSchema(options.current, number().integer().min(0)),
//   enrolls: deriveObjectSchema(options.enrolls, object({
//     id: deriveSchema(options.enrolls.id,
//       string().uuid()),
//     firstName: deriveSchema(options.enrolls.firstName,
//       string()),
//     lastName: deriveSchema(options.enrolls.lastName,
//       string()),
//     phone: deriveSchema(options.enrolls.phone,
//       string().matches(/\+852\d{8}/)),
//     email: deriveSchema(options.enrolls.email,
//       string().email()),
//     paymentStatus: deriveSchema(options.enrolls.paymentStatus,
//       string().matches(/(paid)|(unpaid)/)),
//     stripePaymentId: deriveSchema(options.enrolls.stripePaymentId,
//       string().uuid())
//   }))
// }).validate(data);