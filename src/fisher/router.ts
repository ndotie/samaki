import express from "express";
import { createFish, getFishController } from "./fish_controller";
const router = express.Router();

router.post("/add", createFish);
router.get("/all", getFishController); //getting all the fish
export default router;
