declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_CONFIG: string;

      MODE: 'dev' | 'prod';

      STRIPE_SECRET: string;
      STRIPE_SECRET_TEST: string;
      STRIPE_ENDPOINT_SECRET: string;
      STRIPE_ENDPOINT_SECRET_TEST: string;

      SESSION_SECRET: string;

      SECRET: string;

      APP_DOMAIN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}