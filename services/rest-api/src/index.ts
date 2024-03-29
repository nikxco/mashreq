import cors, { CorsOptions } from "cors";
import 'dotenv/config';
import express, { Express, NextFunction, Request, Response, Router } from 'express';
import AuthRouter from './auth/auth.router';
import { validateEnvVariables } from './common/common.util';
import { ApiKeyValidator } from './common/common.validator';
import UserRouter from './users/user.router';
import { ParseJwtToken } from "./common/common.middleware";
import { HttpStatus } from "./common/common.constant";

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
 * Setting up authenticated user
 */
appRouter.use(ParseJwtToken);

/**
 * Add individual routers to app router
 */
appRoutes.push(AuthRouter);
appRoutes.push(UserRouter);

/**
 * Global error handler can implemented here
 */
appRouter.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatus.InternalServerError).json(error);
});

/**
 * Http server initialization
 */
app.listen(port, () => {
    appRoutes.forEach((route) => {
        console.log(`Mounting routes: ${route.path}`);
        appRouter.use(route.path, route.router);
    });
    console.log(`[Server]: I am running at https://localhost:${port}`);
});