import { Response, Request } from "express";
import { createOrder } from "./order_model";
export const createOrderCtrl = async (req: Request, resp: Response) => {
  try {
    let result = await createOrder();
    resp.json(" Order created ");
  } catch (ex) {
    console.log(ex);
  }
};
