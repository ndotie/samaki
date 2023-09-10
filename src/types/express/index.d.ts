import { Express } from "express-serve-static-core";

interface UserData {
  userId: number;
  iat: number;
  exp: number;
}

interface Context {
  user: UserData;
}

declare module "express-serve-static-core" {
  interface Request {
    context: Context;
  }
}
