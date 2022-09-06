import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { WorkshopType } from "../components/workshop";
import { useFirebaseContext } from "./useFirebaseContext";
import { collection } from "firebase/firestore";
import Logger from "js-logger";


export const useWorkshop = (workshopId: string, realtime?: boolean) => {
  const [workshop, setWorkshop] = useState<WorkshopType>(null);

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshops from server");
    if (!realtime) {
      getDoc(doc(firestore, `/workshops/${workshopId}`))
        .then(snapshot => {
          // @ts-ignore
          setWorkshop(snapshot.data());
          Logger.info("Finish fetching workshops from server");
        })
        .catch(err => {
          Logger.error(err);
        });
    } else {
      // Logger.info("Fetching workshops from server, realtime");
      // onSnapshot(collection(firestore, 'workshops'), snapshot => {
      //   // Room for optimisation (by efficient diff-ing)
      //   let temp = [];
      //   snapshot.docs.forEach(doc => {
      //     temp.push({id: doc.id, ...doc.data()});
      //   });
      //   setWorkshop(snapshot.doc);
      //   Logger.info("Finish setting up realtime listener on workshops collection");
      // });
    }
  }, []);

  return workshop;
}