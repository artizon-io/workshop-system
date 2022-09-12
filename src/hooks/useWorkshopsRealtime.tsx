import { DocumentChangeType, getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop } from "types/workshop";
import { useFirebaseContext } from "hooks/useFirebaseContext";
import { collection } from "firebase/firestore";
import Logger from "js-logger";


type WorkshopsWithChanges = Map<string, {
  changeType: DocumentChangeType | "none",
  workshop: Workshop
}>;


export const useWorkshopsRealtime = () : [WorkshopsWithChanges, boolean, string | null] => {
  const [workshopsWithChanges, setWorkshopsWithChanges] = useState<WorkshopsWithChanges>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshops from server, realtime");
    const listener = onSnapshot(collection(firestore, 'workshops'),
      snapshot => {  // onNext
        const changes = snapshot.docChanges();
        setWorkshopsWithChanges(workshopsWithChanges => {
          // First set all existing docs to changeType: none, & remove all "deleted" docs
          for (let [id, workshopWithChange] of workshopsWithChanges) {
            let temp = workshopWithChange;
            if (temp.changeType === "removed") {
              workshopsWithChanges.delete(id);
            } else {
              temp.changeType = "none";
              workshopsWithChanges.set(id, temp);
            }
          }

          changes.forEach(change => {
            // if (change.type === "removed")
            workshopsWithChanges.set(change.doc.id, {
              changeType: change.type,
              workshop: change.doc.data() as Workshop
            });
          });
          return workshopsWithChanges;
        });
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

  return [workshopsWithChanges, isLoading, error];
}