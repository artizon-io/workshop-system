// import { NextFunction, Request, Response } from "express";
// import * as admin from "firebase-admin";
// import * as functions from "firebase-functions"

// export const appCheck = async (request : Request, response : Response, next : NextFunction) => {
//   if (!request.headers.authorization) {
//     const message = `Missing authorization header`;
//     functions.logger.info(message);
//     return response.status(400).send({message});
//   }

//   try {
//     await admin.appCheck().verifyToken(request.headers.authorization as string);
//   } catch(err) {
//     const message = `Invalid app check token`;
//     functions.logger.info(message);
//     return response.status(400).send({message}); 
//   }
  
//   return next();
// };