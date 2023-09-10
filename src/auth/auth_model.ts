import { prisma } from "../utils/db";

import { hashToken } from "../utils/hashTokens";

//create refresh token
export const addRefreshTokenToWhitelist = (
  jti: any,
  refreshToken: string,
  userId: number
) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
};

//check if token send by the client is in database
export const findRefreshTokenById = (id: string) => {
  return prisma.refreshToken.findUnique({
    where: { id },
  });
};

//soft delete tokens after usage
export const deleteRefreshToken = (id: string) => {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
};

//revoke all the user's token right now
export const revokeTokens = (userId: number) => {
  return prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};
