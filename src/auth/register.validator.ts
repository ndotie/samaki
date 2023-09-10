import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const NewUserSchema = yup.object({
  body: yup.object({
    name: yup.string().min(6, "Name should be atleast 6 characters").required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10, "Invalid phone number").required(),
    gender: yup.string().required(),
    role: yup.string().required(),
    password: yup.string().required(),
  }),
});

export const UserRequestValidation =
  (schema: any) => async (req: Request, resp: Response, next: NextFunction) => {
    try {
      let results = await schema.validate({
        body: req.body,
      });
      //   console.log(results);
      return next();
    } catch (ex: any) {
      console.log(ex);
      if (ex.name === "ValidationError") {
        return resp.json({
          validation_errors: true,
          errors: ex.errors,
        });
      }
      return resp.json({ errors: "Internal error has occurred" });
    }
  };
