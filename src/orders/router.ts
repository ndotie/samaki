import express from "express";
import {
  completeOrderCtrl,
  createOrderCtrl,
  getUserCartCtrl,
  receiveOrderCtrl,
  removeItemFromCartCtrl,
} from "./order_controller";

const router = express.Router();

router.post("/add-cart", createOrderCtrl);
router.get("/cart", getUserCartCtrl);
router.post("/press-order", receiveOrderCtrl);
router.post("/complete-order", completeOrderCtrl);
router.delete("/remove-from-cart/:id", removeItemFromCartCtrl);

export default router;
