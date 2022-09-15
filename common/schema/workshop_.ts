// import { Timestamp } from "firebase/firestore";
// import yup, { date, number, object, string } from "yup";
// import { deriveSchema, DeriveType, MustOrOptional } from "./utils";


// interface Schema {
//   title?: MustOrOptional;
//   description?: MustOrOptional;
//   datetime?: MustOrOptional;
//   duration?: MustOrOptional;
//   language?: MustOrOptional;
//   capacity?: MustOrOptional;
//   fee?: MustOrOptional;
//   venue?: MustOrOptional; 
// }

// interface SchemaDefault extends Schema {
//   title: "must"
//   description: "must"
//   datetime: "must"
//   duration: "must"
//   language: "must"
//   capacity: "must"
//   fee: "must"
//   venue: "must"
// }

// const SchemaDefaultOptions : Schema = {
//   title: "must",
//   description: "must",
//   datetime: "must",
//   duration: "must",
//   language: "must",
//   capacity: "must",
//   fee: "must",
//   venue: "must",
// }

// export interface Workshop<T extends Schema = SchemaDefault> {
//   title: DeriveType<T["title"], string>
//   description: DeriveType<T["description"], string>
//   datetime: DeriveType<T["datetime"], Timestamp>
//   duration: DeriveType<T["duration"], number>
//   language: DeriveType<T["language"], string>
//   capacity: DeriveType<T["capacity"], number>
//   fee: DeriveType<T["fee"], number>
//   venue: DeriveType<T["venue"], string>
// }

// export interface WorkshopWithId<T extends Schema = SchemaDefault> extends Workshop<T> {
//   id: string
// }

// export const validateWorkshop = (data : any, options: Schema & {id: MustOrOptional} = {id: "optional", ...SchemaDefaultOptions}) => object({
//   id: deriveSchema(options.id,
//     string().uuid()),
//   title: deriveSchema(options.title,
//     string().min(1)),
//   description: deriveSchema(options.description,
//     string().min(1)),
//   datetime: deriveSchema(options.datetime,
//     date().test({
//     test(value, context) {
//       if (!(value instanceof Timestamp))
//         return context.createError();
//     }
//     })),
//   duration: deriveSchema(options.duration,
//     number().positive()),
//   language: deriveSchema(options.language,
//     string().min(1)),
//   capacity: deriveSchema(options.capacity,
//     number().positive()),
//   fee: deriveSchema(options.fee,
//     number().min(0)),
//   venue: deriveSchema(options.venue,
//     string().min(1)),
// }).validate(data);