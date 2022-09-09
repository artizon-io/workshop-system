import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "./useFirebaseContext";
import Logger from "js-logger";


export interface Workshop {
  id: string;
  title: string;
  description: string;
  datetime: Timestamp;
  duration: number;
  language: string;
  capacity: number;
  fee: number;
  venue: string;
  mapsrc: string;
}


export const useWorkshop = (workshopId: string) => {
  const [workshop, setWorkshop] = useState<Workshop>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshops from server");
    getDoc(doc(firestore, `/workshops/${workshopId}`))
      .then(snapshot => {
        setWorkshop(snapshot.data() as Workshop);
        Logger.info("Finish fetching workshops from server");
      })
      .catch(err => {
        Logger.error(err);
      });
  }, []);

  return workshop;
}