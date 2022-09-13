import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { checkArgs } from "../../utils/checkArgs";

const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  // useSession: true,
  corsDomain: "all"
}));

// export const makeAdmin = functions.region('asia-east2').https.onCall(async (data, context) => {
app.post("/", async (request, response) => {
  let res;

  res = checkArgs(request, response, ["phoneNumber"])
  if (res)
    return;

  const data = request.body as {
    phoneNumber: string;
  }

  try {
    const user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return response.status(200).send({
      message: `Successfully made ${data.phoneNumber} an admin`
    });

  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }
});

export const makeAdmin = functions.region('asia-east2').https.onRequest(app);