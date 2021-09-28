import dotenv from "dotenv";

const isDev: boolean = process.env.NODE_ENV !== 'production';

console.log(' process.env.NODE_ENV',  process.env.NODE_ENV);

const envFile = `.env.${isDev ? 'dev' : 'prod'}`;

dotenv.config({ path: envFile });

export interface Config {
    port: number;
    isDev: boolean,
    api_host: string
}

const config: Config = {
    port: +(process.env.PORT || 3000),
    isDev: isDev,
    api_host: process.env.API_HOST || ''
};

export { config };