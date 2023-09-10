import express from "express";
import { loginCtrl, registerCtrl } from "./auth_controller";
import { NewUserSchema, UserRequestValidation } from "./register.validator";
const router = express.Router(); //just getting a router from it

router.post("/register", UserRequestValidation(NewUserSchema), registerCtrl);

router.post("/login", loginCtrl);

export default router;
