import express from "express";
import { getUserCtrl, getUsersCtrl } from "./users_controller";
const router = express.Router();

router.get("/all", getUsersCtrl);
router.get("/details/:id", getUserCtrl);

export default router;
