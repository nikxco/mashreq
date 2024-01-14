import express, { Router } from 'express';
import { SignInController } from "./auth.controller";

const router: Router = express.Router()

router
    .route('/')
    .post(
        SignInController
    )

export default { path: '/auth', router }