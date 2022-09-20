import { Workshop, WorkshopSchema, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopSchemaLibrary } from "@mingsumsze/common";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { ZodError } from "zod";


const data = WorkshopSchema.safeParse({
  title: 'test',
  capacity: 120,
  fee: 120,
  datetime: Timestamp.now(),
  description: 'test',
  duration: 120,
  language: 'english',
  venue: 'test'
});

console.log(data);