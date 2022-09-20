import axios, { AxiosError } from "axios";
import * as dotenv from 'dotenv';
import type { AppRouter } from 'functions/trpc/endpoint/client';
import { createTRPCClient } from '@trpc/client';
import { getTransformer } from "@mingsumsze/common";
import { Timestamp } from "firebase/firestore";

dotenv.config();

// const fetchWithCredentials : typeof fetch = (...args) => fetch(...args)
// const fetchWithCredentials : typeof fetch = (url, init?) => fetch(url, {...init, credentials: "include"})

const client = createTRPCClient<AppRouter>({
  url: `${process.env.API_ENDPOINT}`,
  headers: {
    "content-type": "application/json",
    "authorization": `${process.env.API_SECRET}`,
  },
  // fetch: fetchWithCredentials,
  transformer: getTransformer(),
});


test('Workshop create/update/delete', async () => {
  let message : string;
  let workshopId : string;

  ({ message, workshopId } = await client.mutation(
    "createWorkshop",
    {
      "title": "test",
      "description": "test",
      "venue": "test",
      "capacity": 120,
      "fee": 20,
      "duration": 60,
      "language": "eng",
      "datetime": Timestamp.fromDate(new Date("2022-09-16T14:30+0800"))
    }
  ));
  console.debug(message);

  ({ message } = await client.mutation(
    "updateWorkshop",
    {
      id: workshopId,
      title: "new test"
    },
  ));
  console.debug(message);

  ({ message } = await client.mutation(
    "deleteWorkshop",
    {
      id: workshopId,
    },
  ));
  console.debug(message);
});


test('Workshop create/initiateEnroll/enroll', async () => {
  let message : string;
  let workshopId : string;

  ({ message, workshopId } = await client.mutation(
    "createWorkshop",
    {
      "title": "test",
      "description": "test",
      "venue": "test",
      "capacity": 100,
      "fee": 10,
      "duration": 100,
      "language": "eng",
      "datetime": Timestamp.fromDate(new Date("2022-09-16T14:30+0800"))
    },
  ));
  console.debug(message);

  // Wait for serverless to generate workshop confidential doc
  await new Promise((resolve) => setTimeout(() => resolve(null), 3000));

  ({ message } = await client.mutation(
    "initiateEnroll",
    {
      workshopId,
    },
  ));
  console.debug(message);

  // Not in browser environment. Cookie doesn't work
  // ({ message } = await client.mutation(
  //   "enroll",
  //   {
  //     workshopId,
  //     email: "test@domain.io",
  //     firstName: "test",
  //     lastName: "test",
  //     phone: "+85200000000"
  //   },
  // ));
  // console.debug(message);
});


test('Admin create/delete', async () => {
  let message : string;
  let phone = "+85200000000";

  ({ message } = await client.mutation(
    "createAdmin",
    {
      phone,
    },
  ));
  console.debug(message);

  ({ message } = await client.mutation(
    "deleteAdmin",
    {
      phone,
    },
  ));
  console.debug(message);
});