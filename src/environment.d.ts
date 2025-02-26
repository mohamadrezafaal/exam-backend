declare namespace NodeJS {
    export interface ProcessEnv {
        OAUTH_BACKEND_URL?: string;
        WORKFLOW_BACKEND_URL?: string;
        FRONT_URL?: string;
        FILE_MANAGER_BACKEND_URL?: string;
        DB_URL?: string;
        DB_USERNAME?: string;
        DB_PASSWORD?: string;
        DB_DATABASE?: string;
        BACKEND_URL?: string;
        SYSTEM_ID?: number;

    }   
    export type Environment = 'development' | 'production'
}