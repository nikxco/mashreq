import express, { Router } from 'express';
import { CreateUserController, GetUsersController } from './user.controller';
import { CreateUserValidator, MustHaveBasename, UserMustNotExists } from './user.validator';
import { AuthRequiredValidator } from '../common/common.validator';

const router: Router = express.Router()

router
    .route('/')
    .put(
        MustHaveBasename,
        CreateUserValidator,
        UserMustNotExists,
        CreateUserController
    ).get(
        AuthRequiredValidator,
        GetUsersController
    )

export default { path: '/users', router }