import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "hooks/useFirebaseContext";
import Logger from "js-logger";
import { WorkshopConfidential } from "types/workshopConfidential";


export const useWorkshopConfidentialRealtime = (workshopId: string) : [WorkshopConfidential | null, boolean, string | null] => {
  const [workshopConfidential, setWorkshopConfidential] = useState<WorkshopConfidential>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshop-confidential from server, realtime");
    onSnapshot(doc(firestore, `/workshop-confidential/${workshopId}`),
      snapshot => {  // onNext
        setWorkshopConfidential(snapshot.data() as WorkshopConfidential);
        if (isLoading)
          setIsLoading(false);
        Logger.info("Finish setting up realtime listener on workshops collection");
      },
      err => {  // onError
        if (isLoading)
          setIsLoading(false);
        Logger.error(err);
        setError(err.message);
      }
    );
  }, []);

  return [workshopConfidential, isLoading, error];
}