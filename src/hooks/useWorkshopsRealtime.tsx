import { DocumentChangeType, getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop } from "./useWorkshop";
import { useFirebaseContext } from "./useFirebaseContext";
import { collection } from "firebase/firestore";
import Logger from "js-logger";


export const useWorkshopsRealtime = () => {
  const [workshops, setWorkshops] = useState<{
    workshop: [DocumentChangeType, Workshop];
  }>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshops from server, realtime");
    onSnapshot(collection(firestore, 'workshops'), snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        setWorkshops(workshops => {
          workshops[change.doc.id] = [change.type, change.doc.data()];
          return workshops;
        });
        // switch(change.type) {
        //   case 'added':
        //     break;
        //   case 'modified':
        //     break;
        //   case 'removed':
        //     break;
        // }
      });
      Logger.info("Finish setting up realtime listener on workshops collection");
    });
  }, []);

  return workshops;
}