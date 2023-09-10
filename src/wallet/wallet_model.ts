import { prisma } from "../utils/db";

//once a user is paid then it means he have a wallet by default
export type WalletCashType = {
  userId: number;
  paymentDate?: Date;
  amount: number;
};
export const cashAWallet = async (cash: WalletCashType) => {
  //we pick a wallet id from this user,
  //we make payment to this wallet
  let wallets = await prisma.wallet.findFirst({
    select: { id: true },
    where: { userId: cash.userId },
  });
  if (!wallets) {
    let wallet = prisma.wallet.create({
      data: { userId: cash.userId }, //i think cash should contain all the data
    });

    //then we have wallet lets cash in
    let payment = await prisma.payments.create({
      data: {
        walletId: 1, //wallet.id,
        amount: cash.amount,
      },
    });
    return payment;
  }

  let payment = await prisma.payments.create({
    data: {
      walletId: 1, //wallet.id,
      amount: cash.amount,
    },
  });
  return payment;
};

export type ChargeType = {
  //this is a wallete charge and nothing big right!!
  walletId: number;
  amount: number;
  date?: Date;
  service: string; //what he took
  size: string; //the size should be a string as well
};
export const chargeAWallet = async (charge: ChargeType) => {
  return prisma.expenses.create({
    data: charge,
  });
};

export const getUserBalance = async (userId: number, walletId: number) => {
  //   let totalWallet = await prisma.wallet.aggregate({
  //     _sum: {
  //       amount: true,
  //     },
  //     where: {
  //       userId: {
  //         equals: userId,
  //       },
  //     },
  //   });
  //   let totalExp = await prisma.expenses.aggregate({
  //     _sum: {
  //       amount: true,
  //     },
  //     where: {
  //       walletId: {
  //         equals: userId,
  //       },
  //     },
  //   });
  //   return { wallet: totalWallet._sum.amount, exp: totalExp._sum.amount };
  return { wallet: 4, exp: 3 };
};
