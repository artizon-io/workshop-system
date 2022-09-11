import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

export const auth = async (request : Request, response : Response, next : NextFunction) => {
  let hasError = false;

  if (!request.headers.authorization) {
    response.status(400).send(`Missing authorization header`);
    hasError = true;
  }

  try {
    await admin.auth().verifyIdToken(request.headers.authorization as string);
  } catch(err) {
    response.status(400).send(`Invalid Id token`); 
    hasError = true;
  }
  
  if (!hasError)
    next();
};