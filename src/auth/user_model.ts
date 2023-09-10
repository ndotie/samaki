import bcrypt from "bcryptjs"; //i dont think this bcrypt is right
import { prisma } from "../utils/db";

//find user by email only right!!
export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

//i think this will work and we're needing a user type
export const createUserByEmailAndPassword = (user: any) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
