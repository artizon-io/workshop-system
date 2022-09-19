import { SessionData } from "express-session"

declare module 'express-session' {
  interface SessionData {
    readonly enrollInfo?: {
      readonly workshopId: string;
      readonly enrollId: string;
    };
  }
}