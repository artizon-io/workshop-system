import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as csrf from "csurf";
import * as bodyParser from "body-parser";
import { auth, authMode } from "./auth";
import { session } from "./session";
import { stripeAuth } from "./stripeAuth";


export const genMiddleware = ({useAuth = false, useSession = false, corsDomain = "app", useStripe = false} : {
  useAuth?: false | authMode,
  useSession?: boolean,
  corsDomain?: "all" | "app" | "gcp" | "stripe",
  useStripe?: boolean
}) => {
  let domain : string;
  switch (corsDomain) {
    case "all":
      domain = "*"
      break;
    case "app":
      domain = `${process.env.APP_DOMAIN}`
      break;
    case "stripe":
      domain = ""
      break;
    case "gcp":
      domain = ""
      break;
  }

  let temp = [
    cors({
      origin: domain
    }),
    cookieParser(),
    bodyParser.json({}),
    // csrf(),
  ];
  if (useAuth)
    temp.push(auth(useAuth));
  if (useSession)
    temp.push(session);
  if (useStripe)
    temp.push(stripeAuth);
  
  return temp;
}