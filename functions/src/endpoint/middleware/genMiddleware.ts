import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as csrf from "csurf";
import * as bodyParser from "body-parser";
import { auth, authMode } from "./auth";
// import { session } from "./session";


export const genMiddleware = ({useAuth = false, useSession = false, corsDomain = "app"} : {
  useAuth?: false | authMode,
  useSession?: boolean,
  corsDomain?: "all" | "app",
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
    temp.push(auth(useAuth));
  // if (useSession)
  //   temp.push(session);
  
  return temp;
}