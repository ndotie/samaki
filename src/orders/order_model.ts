/**
 * 1. create
 * 2. update
 * 3. delete
 * 4. show
 */

import { prisma } from "../utils/db";

const list = [
  {
    fishId: 2,
    amount: 3,
  },
  {
    fishId: 1,
    amount: 5,
  },
];
export const createOrder = async () => {
  //we need a client id
  let results: any = await prisma.order.create({
    data: { customerId: 2 },
  });
  console.log(results.id);

  //now lets add some items into it
  results = await prisma.orderItems.createMany({
    data: [
      {
        orderId: results.id,
        amount: 13,
        fishId: 1,
      },
      {
        orderId: results.id,
        amount: 12,
        fishId: 2,
      },
      {
        orderId: results.id,
        amount: 6,
        fishId: 2,
      },
    ],
  });
  return results;
};
