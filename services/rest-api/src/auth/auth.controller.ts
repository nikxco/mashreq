import { NextFunction, Request, RequestHandler, Response } from "express";
import { getDatabaseInstance } from "../database/database.service";
import { HttpStatus } from "../common/common.constant";
import { getJwt } from "../common/common.util";

export const SignInController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const db = getDatabaseInstance();
        const user = db.getUserByUsername(username);
        if (user && user.password === password) {
            const { id, username } = user;
            const accessToken = await getJwt({ id, username }, {
                expiresIn: process.env.SESSION_TIMEOUT
            })
            res.status(HttpStatus.Ok).json({
                accessToken
            });
        } else {
            res.status(HttpStatus.Unauthorized).send();
        }
    } catch (error) {
        // Pass error to global error handler
        next(error);
    }
}