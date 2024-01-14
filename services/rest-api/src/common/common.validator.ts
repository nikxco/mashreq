import { NextFunction, Request, Response } from "express";
import { HttpHeader, HttpStatus } from "./common.constant";

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

export const AuthRequiredValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.user) {
            next();
        } else {
            res.status(HttpStatus.Unauthorized).send();
        }
    } catch (err) {
        res.status(HttpStatus.Forbidden).send("Forbidden");
    }
};


