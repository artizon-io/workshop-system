import expressSession from "express-session";
import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from "@google-cloud/firestore";
import { v4 as uuid } from "uuid";


export const sessionStore = new FirestoreStore({
  dataset: new Firestore(),
  kind: 'express-sessions',
});


// See https://expressjs.com/en/resources/middleware/session.html
export const session = expressSession({
  secret: `${process.env.SESSION_SECRET}`,
  genid: () => uuid(),
  store: sessionStore,
  saveUninitialized: false,
  resave: false,
  name: "__session",  // See https://stackoverflow.com/questions/72634189/how-to-properly-use-express-session-on-firebase-cloud-functions
  cookie: {
    maxAge: 60 * 1000 * 60,  // would expire after 60 minutes
    // httpOnly: true,  // The cookie is inaccessible by the client
    // signed: true,  // Indicates if the cookie should be signed
    // secure: true,  // HTTPS only
    sameSite: "strict",  // mitigate CSRF (prevent cookie from transmitted in cross-site-request)
  },
  unset: 'destroy'  // wipe record from db when req.session = null is invoked
});