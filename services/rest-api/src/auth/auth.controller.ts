import { NextFunction, Request, RequestHandler, Response } from "express";

export const LoginController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(req.body);
    } catch (error) {
        // Pass error to global error handler
        next();
    }
}