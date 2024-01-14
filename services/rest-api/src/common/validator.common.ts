import { NextFunction, Request, Response } from "express";
import { HttpHeader, HttpStatus } from "./constant.common";
import { getBearerToken } from "./util.common";
import { verify } from "jsonwebtoken";
import { User } from "../users/user.type";

export const ApiKeyValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const clientApiKey = req.get(HttpHeader.X_API_KEY) || "";
        const serverApiKey = process.env.API_KEY;
        if (clientApiKey !== serverApiKey) {
            res.status(HttpStatus.Forbidden).send("Forbidden");
        } else {
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
                const { username, id } = decodedToken as any;
                req.user = { id, username } as User;
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
