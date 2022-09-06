import { getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { WorkshopType } from "../components/workshop";
import { useFirebaseContext } from "./useFirebaseContext";
import { collection } from "firebase/firestore";
import Logger from "js-logger";


export const useWorkshops = (realtime: boolean) => {
  const [workshops, setWorkshops] = useState<WorkshopType[]>(null);

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
      getDocs(collection(firestore, 'workshops'))
        .then(snapshot => {
          let temp = [];
          snapshot.docs.forEach(doc => {
            temp.push({id: doc.id, ...doc.data()});
          });
          setWorkshops(temp);
          Logger.info("Finish fetching workshops from server");
        })
        .catch(err => {
          Logger.error(err);
        });
    } else {
      Logger.info("Fetching workshops from server, realtime");
      onSnapshot(collection(firestore, 'workshops'), snapshot => {
        // Room for optimisation (by efficient diff-ing)
        let temp = [];
        snapshot.docs.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        setWorkshops(temp);
        Logger.info("Finish setting up realtime listener on workshops collection");
      });
    }
  }, []);

  return workshops;
}