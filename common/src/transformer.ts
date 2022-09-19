import { Timestamp } from "firebase/firestore";
import { deserialize } from "superjson";

type DataTransformer = {
  serialize(object: any): any;
  deserialize(object: any): any;
};

// superjson.registerCustom<any, string>(
//   {
//     isApplicable: (v): v is any => {
//       if (v.datetime == null)
//         return true;

//       try {
//         Timestamp.fromDate(v.datetime);
//         return true;
//       } catch(err) {
//         return false
//       }
//     },
//     serialize: v => {
//       if (v.datetime == null)
//         return JSON.stringify(v);
//       else
//         return JSON.stringify({
//           ...v,
//           datetime: v.datetime.toDate().toISOString()
//         });
//     },
//     deserialize: v => {
//       const data = JSON.parse(v);
//       if (data.datetime == null)
//         return data;
//       else
//         data.datetime = Timestamp.fromDate(new Date(data.datetime))
//     },
//   },
//   'Superjson transformer'
// );

// export const getTransformer = () => superjson;

const transformer : DataTransformer = {
  serialize: (v) => {
    console.debug("Serializing", v);
    if (v.datetime == null)
      return JSON.stringify(v);
    else
      return JSON.stringify({
        ...v,
        datetime: v.datetime.toDate().toISOString()
      });
  },
  deserialize: (v) => {
    console.debug("Deserializing", v);
    const data = JSON.parse(v);
    if (data.datetime == null)
      return data;
    else
      data.datetime = Timestamp.fromDate(new Date(data.datetime))
  }
}

export const getTransformer = () => transformer;