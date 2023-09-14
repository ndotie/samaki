/**
 * 1. create
 * 2. update
 * 3. delete
 * 4. show
 */

import { hidePassword } from "../users/users_model";
import { prisma } from "../utils/db";

export type CartItemType = {
  customerId: number;
  status?: string;
  amount: number;
  fishId: number;
};
export const createOrder = async (cartdata: CartItemType) => {
  //we need a client id
  let cartObject = {
    customerId: cartdata.customerId,
    status: "Cart",
  };

  let cart: any = await prisma.order.findFirst({
    where: cartObject,
  });

  if (!cart) {
    //if we dont have a cart then we create it
    cart = await prisma.order.create({
      data: cartObject,
    });
  }

  //check if its there, if its not there then create it, take its id and add the selected item

  //now lets add some items into it

  let AddItemToCart = await prisma.orderItems.create({
    data: {
      orderId: cart.id,
      amount: cartdata.amount,
      fishId: cartdata.fishId,
    },
  });

  return AddItemToCart;
};

export const removeFromCart = async (id: number) => {
  return prisma.orderItems.delete({
    where: { id },
  });
};
export const getUsersCart = async (customerId: number) => {
  return prisma.order.findFirst({
    where: { customerId, status: "Cart" }, //still a cart
    include: { OrderItems: { include: { fish: true } } },
  });
};

//============= CHANGING ORDER TO PENDING AND FINALLY TO COMPLETED =============
export const receiveOrder = async (cartId: number) => {
  return prisma.order.update({
    where: { id: cartId },
    data: { status: "Pending" },
  });
};

//============= CHANGING ORDER TO COMPLETED =============
export const completeOrder = async (cartId: number) => {
  return prisma.order.update({
    where: { id: cartId },
    data: { status: "Completed" },
  });
};

export const allOrders = async () => {
  return prisma.order.findMany({
    where: {
      status: {
        not: "Cart",
      },
    },
    include: {
      User: { select: hidePassword },
      OrderItems: { include: { fish: true } },
    },
  });
};
