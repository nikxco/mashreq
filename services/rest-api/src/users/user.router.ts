import express, { Router } from 'express';
import { CreateUserController, GetUsersController } from './user.controller';
import { CreateUserValidator, MustHaveBasename, UserMustNotExists } from './user.validator';

const router: Router = express.Router()

router
    .route('/')
    .put(
        MustHaveBasename,
        CreateUserValidator,
        UserMustNotExists,
        CreateUserController
    ).get(
        GetUsersController
    )

export default { path: '/users', router }