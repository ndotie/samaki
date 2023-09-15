import { prisma } from "../utils/db";

export const hidePassword = {
  name: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  email: true,
  phone: true,
  gender: true,
  id: true,
};
//retrieving all the users and we should not retrive db
export const getAllUsers = () => {
  return prisma.user.findMany({
    select: hidePassword,
  });
};

export const getUserDetails = (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: hidePassword,
  });
};
