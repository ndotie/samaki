import { prisma } from "../utils/db";

export type FishToStore = {
  fishedAt: string;
  submittingDate: Date;
  fisherId: number;
  amount: number;
  fishTypeId: number;
};
export const addFish = (fish: FishToStore) => {
  return prisma.fish.create({
    data: {
      ...fish,
    },
  });
};

export const getFish = () => {
  //sooo much will be added to this method making it usable for the sake of it
  return prisma.fish.findMany(); //this shit gives all the fish in here!!
};
