import { Response, Request } from "express";
import {
  CartItemType,
  createOrder,
  getUsersCart,
  receiveOrder,
  completeOrder,
} from "./order_model";
export const createOrderCtrl = async (req: Request, resp: Response) => {
  try {
    let data: CartItemType = {
      fishId: Number(req.body.fishId),
      amount: Number(req.body.amount),
      customerId: req.context.user.userId,
    };
    let result = await createOrder(data);
    resp.json({
      status: true,
      cart_addition: result,
    });
  } catch (ex) {
    console.log(ex);
  }
};

export const getUserCartCtrl = async (req: Request, resp: Response) => {
  try {
    let cart = await getUsersCart(req.context.user.userId);
    return resp.json({
      status: true,
      cart,
    });
  } catch (ex) {
    console.log(ex);
  }
};

export const receiveOrderCtrl = async (req: Request, resp: Response) => {
  try {
    let order = await receiveOrder(Number(req.body.cartId));
    return resp.json({
      status: false,
      order,
    });
  } catch (ex) {
    console.log(ex);
  }
};

export const completeOrderCtrl = async (req: Request, resp: Response) => {
  try {
    let order = await completeOrder(Number(req.body.cartId));
    return resp.json({
      status: false,
      order,
    });
  } catch (ex) {
    console.log(ex);
  }
};
