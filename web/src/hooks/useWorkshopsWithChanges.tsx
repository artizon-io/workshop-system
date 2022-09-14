import { DocumentChangeType, getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop } from "common/schema/workshop";
import { collection } from "firebase/firestore";
import Logger from "js-logger";
import { useFirestore, useFirestoreCollection, useFirestoreCollectionData } from "reactfire";


type WorkshopsWithChanges = Map<string, {
  changeType: DocumentChangeType | "none",
  workshop: Workshop
}>;


export const useWorkshopsWithChanges = () : [WorkshopsWithChanges, boolean, string | null] => {
  const [workshopsWithChanges, setWorkshopsWithChanges] = useState<WorkshopsWithChanges>(new Map());

  const firestore = useFirestore();
  const workshopCol = useFirestoreCollection(collection(firestore, 'workshops'));

  useEffect(() => {
    switch(workshopCol.status) {
      case 'success':
        setWorkshopsWithChanges(state => {
          // Manage existing docs
          for (let [id, workshopWithChange] of state) {
            switch (workshopWithChange.changeType) {
              case "removed":
                state.delete(id);
                break;
              default:
                workshopWithChange.changeType = "none";
                state.set(id, workshopWithChange);
            }
          }
          // Manage incoming docs
          workshopCol.data.docChanges().forEach(change => {
            state.set(change.doc.id, {
              changeType: change.type,
              workshop: change.doc.data() as Workshop
            });
          });

          return state;
        })


        break;
    }
  }, [workshopCol])

  return [workshopsWithChanges, workshopCol.status === 'loading', workshopCol.error?.message];
}