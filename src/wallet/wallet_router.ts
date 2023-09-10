import express from "express";
import {
  CashAWalletCtrl,
  chargeAWalletCtrl,
  getUserBalanceCtrl,
} from "./wallet_controllers";

const router = express.Router();

router.get("/charge-wallet", chargeAWalletCtrl);
router.get("/cash-wallet", CashAWalletCtrl);
router.get("/balance", getUserBalanceCtrl);

export default router;
