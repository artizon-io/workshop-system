declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET: string;
      FIREBASE_CONFIG: string;
      SESSION_SECRET: string;
      APP_DOMAIN: string;
      TEST_SECRET: string;
      MODE: 'dev' | 'prod';
      STRIPE_ENDPOINT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}