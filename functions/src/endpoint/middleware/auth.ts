import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { appCheck } from "./appCheck";


export type authMode = "admin" | "user";

export const auth = (mode : authMode) =>
  async (request : Request, response : Response, next : NextFunction) => {
    if (!request.headers.authorization) {
      const message = `Missing authorization header`;
      functions.logger.info(message);
      return response.status(400).send({message});
    }

    if (`${process.env.MODE}` === 'dev') {
      if (`${process.env.SECRET}` === request.headers.authorization)
        return next();
    }

    switch (mode) {
      case "admin":
      case "user":
        let id;
        try {
          id = await admin.auth().verifyIdToken(request.headers.authorization as string);
        } catch(err) {
          const message = `Invalid Id token`;
          functions.logger.info(message);
          return response.status(400).send({message}); 
        }
        if (mode === "user") break;

        const user = await admin.auth().getUser(id.uid);
        if (!user.customClaims?.admin) {
          const message = `Not enough permission`;
          functions.logger.info(message);
          return response.status(400).send({message});
        }
        break;

      default:
        functions.logger.info(`Unknown authMode ${mode}`);
        return response.sendStatus(500);
    }

    return appCheck(request, response, next);
  };