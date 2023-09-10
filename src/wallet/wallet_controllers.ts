import { Request, Response } from "express";
import {
  WalletCashType,
  WalletChargeType,
  cashAWallet,
  chargeAWallet,
  getUserBalance,
} from "./wallet_model";

export const CashAWalletCtrl = async (req: Request, resp: Response) => {
  try {
    //put some cash into a wallet right now men!!
    let cashIn: WalletCashType = {
      userId: req.context.user.userId,
      amount: Number(req.body.amount),
    };
    let results = await cashAWallet(cashIn);

    //i think this a valid cash to begin with and its done from the backoffice
    return resp.json({
      status: true,
      cash: results,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const chargeAWalletCtrl = async (req: Request, resp: Response) => {
  try {
    let cashOut: WalletChargeType = {
      userId: req.context.user.userId,
      amount: Number(req.body.amount),
      service: req.body.service,
      size: req.body.size,
    };
    let charge = await chargeAWallet(cashOut);

    return resp.json({
      status: true,
      charge,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const getUserBalanceCtrl = async (req: Request, resp: Response) => {
  try {
    let userId = req.context.user.userId;
    let results = await getUserBalance(userId); //so we're going to get a balance in here!!
    resp.json({
      status: true,
      balance: results,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};
