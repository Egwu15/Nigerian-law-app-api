namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string | undefined;
        PORT: string | undefined;
        DB_CONNECT: string;
    }
}