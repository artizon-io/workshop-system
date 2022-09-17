import { CloudTasksClient } from '@google-cloud/tasks';


export const createTask = async (endpoint: string, payload: Object, delay: number, queue: string) => {
  const projectId = JSON.parse(`${process.env.FIREBASE_CONFIG}`).projectId;
  const location = 'asia-east2';

  const tasksClient = new CloudTasksClient();

  await tasksClient.createTask({
    parent: tasksClient.queuePath(
      projectId,
      location,
      queue
    ),
    task: {
      httpRequest: {
        httpMethod: 'POST',
        url: `https://${location}-${projectId}.cloudfunctions.net/${endpoint}`,
        headers: {
          'Context-Type': 'application/json'
        },
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      },
      scheduleTime: {
        seconds: delay * 60 + Date.now() / 1000  // TTL tasks execute in "delay" minutes
      }
    },
  });
}