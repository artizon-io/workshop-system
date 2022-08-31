import { getDocsFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { WorkshopType } from "../components/workshop";
import { useFirebaseContext } from "./useFirebaseContext";
import { collection } from "firebase/firestore";


export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<WorkshopType[]>(null);

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    console.log("Fetching workshops from server");
    getDocsFromServer(collection(firestore, 'workshops'))
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        setWorkshops(temp);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return workshops;
}