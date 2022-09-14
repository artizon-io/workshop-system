import { doc, getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop, WorkshopWithId } from "common/schema/workshop";
import { collection } from "firebase/firestore";
import Logger from "js-logger";
import { useFirestore, useFirestoreCollection, useFirestoreCollectionData } from "reactfire";


export const useWorkshops = () : [WorkshopWithId[] | null, boolean, string | null] => {
  const firestore = useFirestore();
  const [workshops, setWorkshops] = useState<WorkshopWithId[]>(null);
  // const workshopCol = useFirestoreCollectionData(collection(firestore, 'workshops'));
  const workshopCol = useFirestoreCollection(collection(firestore, 'workshops'));

  useEffect(() => {
    switch (workshopCol.status) {
      case 'success':
        setWorkshops(
          workshopCol.data.docs.map(doc => ({id: doc.id, ...(doc.data() as Workshop)}))
        );
        break;
    }
  }, [workshopCol]);

  return [workshops, workshopCol.status === 'loading', workshopCol.error?.message];
}