/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_APPCHECK_SITE_KEY: string;
  
  readonly VITE_STRIPE_API_KEY: string;
  readonly VITE_STRIPE_API_TEST_KEY: string;

  readonly VITE_IS_DEMO_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}