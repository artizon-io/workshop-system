import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

export const auth = async (request : Request, response : Response, next : NextFunction) => {
  if (!request.headers.authorization)
    return response.status(400).send(`Missing authorization header`);

  try {
    await admin.auth().verifyIdToken(request.headers.authorization as string);
  } catch(err) {
    return response.status(400).send(`Invalid Id token`); 
  }
  
  next();

  return null;
};