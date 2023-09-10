import jwt from "jsonwebtoken";
export const generateAccessToken = (user: any) => {
  const accessToken: string = process.env.ACCESS_TOKEN_SECRET || "";
  return jwt.sign(
    {
      userId: user.id,
    },
    accessToken,
    {
      expiresIn: "365d",
    }
  );
};

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export function generateRefreshToken(user: any, jti: any) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET || "",
    {
      expiresIn: "8h",
    }
  );
}

export function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
