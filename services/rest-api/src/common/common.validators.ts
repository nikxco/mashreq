import { NextFunction, Request, Response } from "express";
import { HttpHeader, HttpStatus } from "./common.constant";
import { getBearerToken } from "./util.common";
import { verify } from "jsonwebtoken";
import { User } from "../auth/auth.type";

export const ApiKeyValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const clientApiKey = req.get(HttpHeader.X_API_KEY) || "";
        const serverApiKey = process.env.API_KEY;
        const allowedOrigin = process.env.ALLOWED_ORIGIN;
        if (clientApiKey !== serverApiKey) {
            res.status(HttpStatus.Forbidden).send("Forbidden");
        } else {
            // var origin = req.get("origin");
            // if (typeof allowedOrigin === "string" && allowedOrigin === "*") {
            //   next();
            // } else if (
            //   Array.isArray(allowedOrigin) &&
            //   allowedOrigin.findIndex((host: any) => origin === host) >= 0
            // ) {
            //   next();
            // } else {
            //   res.status(Http.Forbidden).send("Forbidden");
            // }
            next();
        }
    } catch (err) {
        res.status(HttpStatus.Forbidden).send("Forbidden");
    }
};

export const parseJwtTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getBearerToken(req);
        const appSecret = process.env.APP_SECRET!;
        if (token) {
            const decodedToken = verify(token, appSecret);
            if (decodedToken) {
                const { id, name, email, emailVerified, roles } = decodedToken as any;
                req.user = { id, name, email, emailVerified, roles } as User;
            }
        } else {
            console.log("Token not available");
        }
        next();
    } catch (error) {
        console.log("Access token expired.");
        next();
    }
};
