import { Timestamp } from "firebase-admin/firestore";
// import { Timestamp } from "firebase/firestore";

type DataTransformer = {
  serialize(object: any): any;
  deserialize(object: any): any;
};

type CombinedDataTransformer = {
  input: DataTransformer;
  output: DataTransformer;
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

const createTransformer = (type: "input" | "output") : DataTransformer => {
  return {
    serialize: (v) => {
      console.debug("Serializing", v);
      if (v.datetime == null)
        return v;
        // return JSON.stringify(v);
      else
        return {
          ...v,
          datetime: v.datetime.toDate().toISOString()  
        }
        // return JSON.stringify({
        //   ...v,
        //   datetime: v.datetime.toDate().toISOString()
        // });
    },
    deserialize: (v) => {
      console.debug("Deserializing", v);
      const data = v;
      // const data = JSON.parse(v);
      if (data.datetime == null)
        data;
      else
        data.datetime = Timestamp.fromDate(new Date(data.datetime));
      return data;
    }
  }
}

const combinedTransformer : CombinedDataTransformer = {
  input: createTransformer("input"),
  output: createTransformer("output")
};

export const getTransformer = () => combinedTransformer;