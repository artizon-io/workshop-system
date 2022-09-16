import * as expressSession from "express-session";
import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from "@google-cloud/firestore";


// See https://expressjs.com/en/resources/middleware/session.html
export const session = expressSession({
  secret: `${process.env.SESSION_SECRET}`,
  store: new FirestoreStore({
    dataset: new Firestore(),
    kind: 'express-sessions',
  }),
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
});