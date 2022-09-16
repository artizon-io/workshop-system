import { validateWorkshop, Workshop, WorkshopSchema, validateWorkshopConfidential, WorkshopConfidential, WorkshopConfidentialSchema } from "@mingsumsze/common";
import { array, number, object, ValidationError } from "yup";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';

// console.log('WorkshopSchema: ' + WorkshopSchema);
// console.log('constructSchema: ' + constructSchema);

(async () => {
  console.info(`Testing workshop`);

  try {
    const result = await validateWorkshop({
      title: 'test',
      capacity: 120,
      fee: 120,
      datetime: Timestamp.now(),
      description: 'test',
      duration: 120,
      language: 'english',
      venue: 'test'
    } as Workshop);
    if (result) console.info('Success');
  } catch(err) {
    console.error((err as ValidationError).message);
  }

  console.info(`Testing workshop confidential`);

  try {
    const result = await validateWorkshopConfidential({
      current: 120,
      enrolls: [{
        id: uuid(),
        paymentStatus: 'paid'
      }, {
        id: uuid(),
        paymentStatus: 'unpaid'
      }]
    } as WorkshopConfidential);
    if (result) console.info('Success');
  } catch(err) {
    console.error((err as ValidationError).message);
  }
})();

