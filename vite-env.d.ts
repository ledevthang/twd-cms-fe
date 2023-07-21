/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_END_POINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
