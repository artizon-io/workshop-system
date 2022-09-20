import { Workshop, WorkshopSchema, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopSchemaLibrary } from "@mingsumsze/common";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { ZodError } from "zod";


const STRIPE_PAYMENT_ID = 'pi_fjdieif192fjeiJDIFJS29DJ';


test('WorkshopSchema fit', () => {
  expect(() =>
    WorkshopSchema.parse({
      title: 'test',
      capacity: 120,
      fee: 120,
      datetime: Timestamp.now(),
      description: 'test',
      duration: 120,
      language: 'english',
      venue: 'test'
    })
  ).not.toThrowError();
});

test('WorkshopSchema unfit - missing fields', () => {
  expect(() =>
    WorkshopSchema.parse({
      title: 'test',
      capacity: 120,
      fee: 120,
      datetime: Timestamp.now(),
      description: 'test',
      duration: 120,
      venue: 'test'
    })
  ).toThrowError();
});

test('WorkshopSchema unfit - incorrect format', () => {
  expect(() =>
    WorkshopSchema.parse({
      title: 'test',
      capacity: 120,
      fee: 120,
      datetime: Date.now(),
      description: 'test',
      duration: 120,
      language: 'english',
      venue: 'test'
    })
  ).toThrowError();
});



test('WorkshopConfidentialSchema fit', () => {
  expect(() =>
    WorkshopConfidentialSchema.parse({
      current: 120,
      enrolls: [{
        id: uuid(),
        paymentStatus: 'paid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }, {
        id: uuid(),
        paymentStatus: 'unpaid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }]
    } as WorkshopConfidential)
  ).not.toThrowError();
});

test('WorkshopConfidentialSchema unfit - missing fields', () => {
  expect(() =>
    WorkshopConfidentialSchema.parse({
      current: 120,
      enrolls: [{
        paymentStatus: 'paid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }, {
        id: uuid(),
        paymentStatus: 'unpaid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }]
    })
  ).toThrowError();
});

test('WorkshopConfidentialSchema unfit - incorrect format', () => {
  expect(() =>
    WorkshopConfidentialSchema.parse({
      current: 120,
      enrolls: [{
        id: '29DJdhud839fHDFNAPWI2',
        paymentStatus: 'paid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }, {
        id: uuid(),
        paymentStatus: 'unpaid',
        stripePaymentId: STRIPE_PAYMENT_ID
      }]
    })
  ).toThrowError();
});