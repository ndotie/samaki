import { Response, Request } from "express";
import {
  CartItemType,
  createOrder,
  getUsersCart,
  receiveOrder,
  completeOrder,
  removeFromCart,
  allOrders,
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

export const removeItemFromCartCtrl = async (req: Request, resp: Response) => {
  try {
    await removeFromCart(Number(req.params.id));
    return resp.json({
      status: true,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: "Some errors occured!",
    });
  }
};

export const getOrdersCtrl = async (req: Request, resp: Response) => {
  try {
    let results = await allOrders(); //just for the fun!! my head spinned when things didnt go my way but now am high agian
    return resp.json({
      status: true,
      orders: results,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: "An error has occured",
    });
  }
};
