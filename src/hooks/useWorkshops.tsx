import { getDocs, getDocsFromServer, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Workshop } from "types/workshop";
import { useFirebaseContext } from "hooks/useFirebaseContext";
import { collection } from "firebase/firestore";
import Logger from "js-logger";


export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>(null);

  const {
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    Logger.info("Fetching workshops from server");
    getDocs(collection(firestore, 'workshops'))
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });
        setWorkshops(temp);
        Logger.info("Finish fetching workshops from server");
      })
      .catch(err => {
        Logger.error(err);
      });
  }, []);

  return workshops;
}