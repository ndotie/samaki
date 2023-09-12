import { Request, Response } from "express";
import { getAllUsers, getUserDetails } from "./users_model";
import { getUserBalance } from "wallet/wallet_model";
export const getUsersCtrl = async (req: Request, resp: Response) => {
  try {
    let results = await getAllUsers();
    return resp.json({
      status: true,
      users: results,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: "An error has occured",
    });
  }
};

export const getUserCtrl = async (req: Request, resp: Response) => {
  try {
    let { id } = req.params;
    let user_details = await getUserDetails(Number(id));
    let { balance } = await getUserBalance(Number(id));
    return resp.json({
      status: true,
      user: user_details,
      balance,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: "An error has occured",
    });
  }
};
