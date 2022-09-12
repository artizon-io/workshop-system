import * as express from "express";
import { Request, Response } from "express";
import * as functions from "firebase-functions";


export const checkDoc = (request : Request, response : Response, snapshot : FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>, docStructure : any) : [FirebaseFirestore.DocumentData | null, Response | null] => {
  const doc = snapshot.data();
  if (!doc) {
    const message = `Document with id ${snapshot.id} doesn't exist`;
    functions.logger.error(message);
    return [null, response.sendStatus(500)];
  }

  let temp : string[] = [];
  for (let [field, type] of docStructure) {
    if (doc[field] == null || typeof doc[field] !== type) {  // === null || typeof === undefined || !== specified type
      temp.push(field);
    }
  }

  if (temp) {
    const message = `Document fields ${temp.join(", ")} are missing or have incorrect type`;
    functions.logger.error(message);
    return [null, response.sendStatus(500)];
  }

  return [doc, null];
}