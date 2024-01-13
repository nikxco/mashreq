import { Request } from "express";
import { HttpHeader } from "./common.constant";

export const getBearerToken = (req: Request): string | null => {
    let token = req.get(HttpHeader.Authorization) || "";
    token = token && token.split(" ")[1];
    return token || null;
};

export const validateEnvVariables = (env: NodeJS.ProcessEnv) => {
    const { APP_SECRET, API_KEY, ALLOWED_ORIGIN, SERVER_PORT, BASE_PATH } = env;
    let missingVariables = [];
    if (!APP_SECRET) {
        missingVariables.push('APP_SECRET');
    }
    if (!API_KEY) {
        missingVariables.push('API_KEY');
    }
    if (!ALLOWED_ORIGIN) {
        missingVariables.push('ALLOWED_ORIGIN');
    }
    if (!SERVER_PORT) {
        missingVariables.push('SERVER_PORT');
    }
    if (!BASE_PATH) {
        missingVariables.push('BASE_PATH');
    }
    if (missingVariables.length > 0) {
        console.error(`Environment variables: [${missingVariables.join(', ')}] are missing.`);
        process.exit(1);
    } else {
        console.info('Environment variables initialized.');
    }

}