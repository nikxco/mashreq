import 'dotenv/config';
import express, { Express, Router } from 'express';
import cors, { CorsOptions } from "cors";
import AuthRouter from './auth/auth.router';
import UserRouter from './users/user.router';
import { ApiKeyValidator } from './common/validator.common';
import { validateEnvVariables } from './common/util.common';

/**
 * Make sure environment variables are set and ready to use.
 */
validateEnvVariables(process.env);

const app: Express = express();
const port = process.env.SERVER_PORT!;
const basePath = process.env.BASE_PATH!;
const allowedOrigin = process.env.ALLOWED_ORIGIN! as CorsOptions;
const appRouter = express.Router();
const appRoutes: Array<{ path: string, router: Router }> = [];

/**
 * Here we are adding middleware to parse all incoming requests as JSON
 */
app.use(express.json());

/**
 * Attaching CORS middleware to allow cross-origin requests
 */
app.use(cors(allowedOrigin));

/**
 * Mounting app router on base path
 */
app.use(basePath, appRouter);
console.info(`API mounted on base: ${basePath}`);

/**
 * Attaching ApiKeyValidator middleware to make sure each request 
 * must have a valid api key.
 */
appRouter.use(ApiKeyValidator)


/**
 * Add individual routers to app router
 */
appRoutes.push(AuthRouter);
appRoutes.push(UserRouter);


app.listen(port, () => {
    appRoutes.forEach((route) => {
        console.log(`Mounting routes: ${route.path}`);
        appRouter.use(route.path, route.router);
    });
    console.log(`[Server]: I am running at https://localhost:${port}`);
});