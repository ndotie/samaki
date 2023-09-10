import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { generateAccessToken, generateTokens } from "../utils/jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "./auth_model";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "./user_model";

export const registerCtrl = async (req: Request, resp: Response) => {
  try {
    const { name, email, phone, password, role, gender } = req.body;
    //TODO we need to validate these ones
    if (!email || !password) {
      resp.status(400);
      return resp.json({
        status: false,
        msg: "Fill all the fields",
        validation_errors: true,
        errors: ["Fill all the fields"],
      }); //exexution ends there!!
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      // resp.status(400);
      return resp.json({
        status: false,
        validation_errors: true,
        msg: "This email is already used!",
        errors: ["This email is already used!"],
      });
    }

    //now creating a new user
    const user = await createUserByEmailAndPassword({
      name,
      email,
      phone,
      password,
      role,
      gender,
    });

    //now lets generate tokens to be used by the user
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist(jti, refreshToken, user.id);
    const { password: pw, ...rest } = user;
    resp.status(201);
    return resp.json({
      status: true,
      accessToken,
      refreshToken,
      user: rest, //so we have a handle for him!!
    });
  } catch (ex) {
    console.log(ex);
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const loginCtrl = async (req: Request, resp: Response) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      // resp.status(403);
      return resp.json({
        status: false,
        msg: "Email/Password are not correct",
      });
    }

    //check if user is existing one
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      // resp.status(403);
      return resp.json({
        status: false,
        msg: "Email/Password are not correct",
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password); //TODO i dont know if this will give valid comparisons
    if (!validPassword) {
      // resp.status(403);//i think this doesnt save me well
      return resp.json({
        status: false,
        msg: "Email/Password are not correct",
      });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist(jti, refreshToken, existingUser.id);
    const { password: pw, ...rest } = existingUser;
    resp.status(200);
    return resp.json({
      status: true,
      user: rest,
      accessToken,
      refreshToken,
    });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

//TODO i dont know hwo to use refresh token, so what we do is just make the user time long enough so we dont use refresh token
//URL : https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
export const refreshifyToken = async (req: Request, resp: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      resp.status(400);
      return resp.json({
        status: false,
        msg: "Invalid tokens",
      });
    }

    //we have refresh token
    const payload: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || ""
    );

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      resp.status(401);
      return resp.json({
        status: false,
        msg: "Invalid tokens",
      });
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      resp.status(401);
      return resp.json({
        status: false,
        msg: "Invalid token",
      });
    }

    //delete the prev refresh token
    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );

    const { password, ...rest } = user;
    resp.json({
      status: true,
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (ex) {
    resp.status(400);
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

//dont know even how to use this one
//URL : https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk
export const revokeRefreshTokens = async (req: Request, resp: Response) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    resp.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (ex) {
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};
