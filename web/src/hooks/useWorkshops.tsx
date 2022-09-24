import { DocumentChangeType, getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { useFirestore, useFirestoreCollection, useFirestoreCollectionData } from "reactfire";
import { Workshop, Optional } from "@mingsumsze/common";


type Workshops = {[id : string]: {
  changeType: DocumentChangeType | "none",
  workshop: Workshop
}};

const useWorkshops = () : [Workshops, boolean, Optional<string>] => {
  const [workshops, setWorkshops] = useState<Workshops>({});

  const firestore = useFirestore();
  const workshopCol = useFirestoreCollection(collection(firestore, 'workshops'));

  useEffect(() => {
    switch(workshopCol.status) {
      case 'success':
        // Optional
        // workshopCol.data.docs.forEach(doc => WorkshopSchema.parse(doc));
        setWorkshops(state => {
          // Manage existing docs
          for (let [id, workshop] of Object.entries(state)) {
            switch (workshop.changeType) {
              case "removed":
                delete state.id;
                break;
              default:
                workshop.changeType = "none";
                state.id = workshop;
            }
          }
          // Manage incoming docs
          workshopCol.data.docChanges().forEach(change => {
            state[change.doc.id] = {
              changeType: change.type,
              workshop: change.doc.data() as Workshop
            };
          });

          return state;
        })

        break;
    }
  }, [workshopCol])

  return [workshops, workshopCol.status === 'loading', workshopCol.error?.message];
}

export default useWorkshops;