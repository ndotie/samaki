import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserData } from "types/express";
/**
 * articles
 * https://blog.logrocket.com/extend-express-request-object-typescript/
 * https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
 */
export const isAuthenticated = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    resp.status(401);
    return resp.json({
      status: false,
      msg: "Un authorized access",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
    req.context = { ...req.context, user: payload as UserData };
    return next();
  } catch (ex) {
    //i dont know
    resp.status(401);
    return resp.json({
      status: false,
      msg: "Token expired",
    });
  }

  return next();
};
