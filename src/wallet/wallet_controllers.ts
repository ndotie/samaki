import { Request, Response } from "express";
import {
  ChargeType,
  cashAWallet,
  chargeAWallet,
  getUserBalance,
} from "./wallet_model";

export const CashAWalletCtrl = async (req: Request, resp: Response) => {
  try {
    //put some cash into a wallet right now men!!
    let results = await cashAWallet({
      userId: 2,
      amount: 2820000.0,
    });

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
    let charge = await chargeAWallet({
      walletId: 1,
      amount: 100,
      service: "Ice",
      size: "3 blocks",
    } as ChargeType);

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
    let results = await getUserBalance(1, 1); //so we're going to get a balance in here!!
    resp.json({
      status: true,
      results,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};
