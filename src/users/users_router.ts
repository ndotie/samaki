import express from "express";
import { getUsersCtrl } from "./users_controller";
const router = express.Router();

router.get("/all", getUsersCtrl);

export default router;
