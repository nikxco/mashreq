import { NextFunction, Request, Response } from "express";
import { getBearerToken } from "./common.util";
import { verify } from "jsonwebtoken";
import { User } from "../users/user.type";

export const ParseJwtToken = async (req: Request, res: Response, next: NextFunction) => {
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