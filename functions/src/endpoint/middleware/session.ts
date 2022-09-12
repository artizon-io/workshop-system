import * as expressSession from "express-session";
import * as connectFirebase from "connect-firebase";


const FirebaseStore = connectFirebase(expressSession);


export const session = expressSession({
  secret: process.env.SESSION_SECRET,
  store: new FirebaseStore({
    // The URL you were given when you created your Firebase
    // host: 'connect-sessions.firebaseio.com',
    host: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
 
    // Optional. A Firebase authentication token
    // token: 'qKtOKAQSTCxLFJI7uSeof6H7cfLpSuWYOhqOTQqz',
  
    // Optional. How often expired sessions should be cleaned up.
    // Defaults to 21600000 (6 hours).
    reapInterval: 0.5 * 60 * 60 * 1000,  // in 30 mins
  }),
  cookie: {
    maxAge: 60 * 1000 * 60,  // would expire after 60 minutes
    httpOnly: true,  // The cookie is inaccessible by the client
    signed: true,  // Indicates if the cookie should be signed
    secure: true,  // HTTPS only
    sameSite: "strict",  // mitigate CSRF (prevent cookie from transmitted in cross-site-request)
  },
});