import express from "express";
import {
  completeOrderCtrl,
  createOrderCtrl,
  getUserCartCtrl,
  receiveOrderCtrl,
} from "./order_controller";

const router = express.Router();

router.post("/add-cart", createOrderCtrl);
router.get("/cart", getUserCartCtrl);
router.post("/press-order", receiveOrderCtrl);
router.post("/complete-order", completeOrderCtrl);

export default router;
