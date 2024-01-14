import { NextFunction, Request, RequestHandler, Response } from "express";
import { getDatabaseInstance } from "../database/database.service";
import { randomUUID } from "crypto";
import { HttpStatus } from "../common/common.constant";

export const CreateUserController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const db = getDatabaseInstance();
        const userId = randomUUID();
        db.addUser({
            id: userId,
            username,
            password,
            createdOn: Date.now()
        });
        res.status(HttpStatus.Accepted).send();
    } catch (error) {
        // Pass error to global error handler
        next(error);
    }
}

export const GetUsersController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = getDatabaseInstance();
        const users = db.getUsers(({ id, username, createdOn }) => {
            return { id, username, createdOn }
        })
        res.status(HttpStatus.Ok).json(users);
    } catch (error) {
        // Pass error to global error handler
        next(error);
    }
}