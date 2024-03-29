export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        ENV: 'test' | 'dev' | 'prod';
        HTTP_PORT: string | undefined;
        DEBUG_REST: 'true' | undefined;
        SCALING_STRATEGY: 'CLOUD'|'SERVER'|undefined;
        ENABLE_SWAGGER: 'Y'|'N'|undefined;
        DATABASE_STRATEGY: 'MONGO_STD'|undefined;
        DATABASE_URI: string|undefined;
    }
  }
}