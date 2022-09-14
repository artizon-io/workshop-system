import { getDocs, getDocsFromServer, onSnapshot, doc, getDoc, DocumentData, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Logger from "js-logger";
import { Workshop } from "common/schema/workshop";
import { useFirestore, useFirestoreCollectionData, useFirestoreDocDataOnce } from "reactfire";


export const useWorkshopOnce = (workshopId: string) : [Workshop | null, boolean, string | null] => {
  const firestore = useFirestore();
  const workshopDoc = useFirestoreDocDataOnce(doc(firestore, `/workshops/${workshopId}`));

  return [workshopDoc.data as Workshop, workshopDoc.status === 'loading', workshopDoc.error?.message];
}