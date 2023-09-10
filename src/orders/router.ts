import express from "express";
import { createOrderCtrl } from "./order_controller";

const router = express.Router();

router.get("/", createOrderCtrl);
export default router;
