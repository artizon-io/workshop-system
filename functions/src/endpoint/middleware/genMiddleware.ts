import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as csrf from "csurf";
import * as bodyParser from "body-parser";
import { auth } from "./auth";
import { appCheck } from "./appCheck";
// import { session } from "./session";


export const genMiddleware = ({useAuth = false, useSession = false, corsDomain = "app", useAppCheck = false} : {
  useAuth?: boolean,
  useSession?: boolean,
  corsDomain?: "all" | "app",
  useAppCheck?: boolean
}) => {
  let temp = [
    cors({
      origin: corsDomain === "app" ? process.env.APP_DOMAIN : true
    }),
    cookieParser(),
    bodyParser.json({}),
    // csrf(),
  ];
  if (useAuth)
    temp.push(auth);
  // if (useSession)
  //   temp.push(session);
  if (useAppCheck)
    temp.push(appCheck);
  
  return temp;
}