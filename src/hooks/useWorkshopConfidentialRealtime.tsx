import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "./useFirebaseContext";
import Logger from "js-logger";


export interface WorkshopConfidential {
  current: number;
  enrolls: Array<{
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    paymentStatus: string;
  }>
}


export const useWorkshopConfidentialRealtime = (workshopId: string) => {
  const [workshopConfidential, setWorkshopConfidential] = useState<WorkshopConfidential>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshop-confidential from server, realtime");
    onSnapshot(doc(firestore, `/workshop-confidential/${workshopId}`), snapshot => {
      setWorkshopConfidential(snapshot.data() as WorkshopConfidential);
    });
  }, []);

  return workshopConfidential;
}