import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const auth = async (request : Request, response : Response, next : NextFunction) => {
  if (!request.headers.authorization) {
    functions.logger.info(`Missing authorization header`);
    return response.status(400).send(`Missing authorization header`);
  }

  try {
    await admin.auth().verifyIdToken(request.headers.authorization as string);
  } catch(err) {
    functions.logger.info(`Invalid Id token`);
    return response.status(400).send(`Invalid Id token`); 
  }
  
  next();

  return null;
};