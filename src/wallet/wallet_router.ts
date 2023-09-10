import express from "express";
import {
  CashAWalletCtrl,
  chargeAWalletCtrl,
  getUserBalanceCtrl,
} from "./wallet_controllers";

const router = express.Router();

router.post("/charge-wallet", chargeAWalletCtrl);
router.post("/cash-wallet", CashAWalletCtrl);
router.get("/check-balance", getUserBalanceCtrl);

export default router;
