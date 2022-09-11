import { useContext } from "react";
import { FirebaseContext } from "context/firebaseContext";


export const useFirebaseContext = () => useContext(FirebaseContext);