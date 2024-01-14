import { NextFunction, Request, Response } from "express"
import { basenameToCountry, toValidationErrorsFromYup } from "../common/common.util";
import { getSignUpFormSchema } from "./user.schema";
import { HttpStatus } from "../common/common.constant";
import { getDatabaseInstance } from "../database/database.service";
import { string } from "yup";

export const CreateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const selectedCountry = basenameToCountry(body.basename);
        const schema = getSignUpFormSchema(selectedCountry)
        await schema.validate(body, {
            abortEarly: false
        });
        next();
    } catch (error) {
        res.status(HttpStatus.BadRequest).json(
            toValidationErrorsFromYup(error as { inner: any[] })
        );
    }
}
export const MustHaveBasename = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { basename } = req.body;
        const schema = string().required().label('Basename');
        await schema.validate(basename, {
            abortEarly: false
        });
        next();
    } catch (error) {
        res.status(HttpStatus.BadRequest).json(
            toValidationErrorsFromYup(error as { inner: any[] })
        );
    }
}

export const UserMustNotExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.body;
        const db = getDatabaseInstance();
        const user = db.getUserByUsername(username);
        if (user) {
            res.status(HttpStatus.Conflict).json([{ message: `User already exist: ${username}` }])
        } else {
            next();
        }
    } catch (error) {
        res.status(HttpStatus.BadRequest).json(error);
    }
}