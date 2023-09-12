import { prisma } from "../utils/db";

//retrieving all the users and we should not retrive db
export const getAllUsers = () => {
  return prisma.user.findMany();
};
