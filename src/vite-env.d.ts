/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
  VITE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
