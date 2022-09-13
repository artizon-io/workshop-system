import { Request, Response } from "express";
import * as functions from "firebase-functions";


export const checkArgs = (request : Request, response : Response, args: string[]) => {
  let temp : string[] = [];

  args.forEach(arg => {
    if (!request.body[arg]) {
      temp.push(arg);
    }
  });

  if (temp) {
    const message = `Missing arguments ${temp.join(', ')}`;
    functions.logger.info(message);
    return response.status(400).send({message});
  }

  return null;
}