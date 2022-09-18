import { SessionData } from "express-session"

declare module 'express-session' {
  interface SessionData {
    enrollInfo?: {
      workshopId: string;
      enrollId: string;
    };
  }
}