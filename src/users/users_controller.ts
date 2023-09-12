import { Request, Response } from "express";
import { getAllUsers } from "./users_model";
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
