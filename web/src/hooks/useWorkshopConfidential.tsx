import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Logger from "js-logger";
import { WorkshopConfidential } from "common/schema/workshopConfidential";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { number, object, string } from "yup";
import { validateWorkshopConfidential } from "common/schema/workshop";


export const useWorkshopConfidential = (workshopId: string) : [WorkshopConfidential | null, boolean, string | null] => {
  const [workshopConfidential, setWorkshopConfidential] = useState<WorkshopConfidential>(null);

  const firestore = useFirestore();
  const workshopConfidentialDoc = useFirestoreDocData(doc(firestore, `/workshop-confidential/${workshopId}`));

  useEffect(() => {
    switch(workshopConfidentialDoc.status) {
      case "success":
        validateWorkshopConfidential(workshopConfidentialDoc.data);
        setWorkshopConfidential(workshopConfidentialDoc.data as WorkshopConfidential);
        break;
    }
  }, [workshopConfidentialDoc])

  return [workshopConfidential, workshopConfidentialDoc.status === 'loading', workshopConfidentialDoc.error?.message];
}