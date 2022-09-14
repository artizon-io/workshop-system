import { getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop } from "types/workshop";
import { collection } from "firebase/firestore";
import Logger from "js-logger";
import { useFirestore, useFirestoreCollectionData } from "reactfire";


export const useWorkshops = () : [Workshop[] | null, boolean, string | null] => {
  const firestore = useFirestore();
  const workshopCol = useFirestoreCollectionData(collection(firestore, 'workshops'));


  return [workshopCol.data as Workshop[], workshopCol.status === 'loading', workshopCol.error.message];
}