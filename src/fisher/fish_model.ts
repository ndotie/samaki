import { prisma } from "../utils/db";

export const addFish = (fish: any) => {
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
