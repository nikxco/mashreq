import express, { Router } from 'express';
import { LoginController } from "./auth.controller";

const router: Router = express.Router()

router
    .route('/')
    .post(
        LoginController
    )

export default { path: '/auth', router }