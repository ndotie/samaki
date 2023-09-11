import { Decimal } from "@prisma/client/runtime/library";
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
  let wallet = await prisma.wallet.findFirst({
    select: { id: true },
    where: { userId: cash.userId },
  });
  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId: cash.userId }, //i think cash should contain all the data
    });

    //then we have wallet lets cash in
    let payment = await prisma.payments.create({
      data: {
        walletId: wallet.id,
        amount: cash.amount,
      },
    });
    return payment;
  }

  let payment = await prisma.payments.create({
    data: {
      walletId: wallet.id,
      amount: cash.amount,
    },
  });
  return payment;
};

export type WalletChargeType = {
  //this is a wallete charge and nothing big right!!
  userId: number;
  amount: number;
  date?: Date;
  service: string; //what he took
  size: string; //the size should be a string as well
};
export const chargeAWallet = async (charge: WalletChargeType) => {
  let wallet = await prisma.wallet.findFirst({
    where: { userId: charge.userId },
  });
  if (!wallet) {
    return false; //no wallete... we should check even a balance
  }
  let { balance } = await getUserBalance(charge.userId);
  if (balance < charge.amount) {
    return false;
  }
  let { userId, ...rest } = charge;
  return prisma.expenses.create({
    data: { ...rest, walletId: wallet.id },
  });
};

export const getUserBalance = async (userId: number) => {
  let wallet = await prisma.wallet.findFirst({
    select: { id: true },
    where: { userId: userId },
  });

  if (!wallet) {
    //if there is no wallet thes means he have zero balance
    return { balance: 0 };
  }

  let cashIn = await prisma.payments.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      walletId: wallet.id,
    },
  });

  let cashOut = await prisma.expenses.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      walletId: wallet.id,
    },
  });

  let pesaOut: any = 0.0;
  if (cashOut && cashOut._sum.amount) pesaOut = cashOut._sum.amount;

  let pesaIn: any = 0.0;
  if (cashIn && cashIn._sum.amount) pesaIn = cashIn._sum.amount;

  return {
    balance: pesaIn - pesaOut,
  };
};
