import { Request, Response } from "express";
import { addFish, getFish } from "./fish_model";

export const createFish = async (req: Request, resp: Response) => {
  let results = await addFish({
    //.. now lets put some data for the fish right now!!
    name: req.body.name,
    fishedAt: req.body.kituo,
    submittingDate: new Date(), //so this is a datetime right now
    amount: Number(req.body.amount),
  });
  resp.json({
    status: true,
    results,
  });
};

export const getFishController = async (req: Request, resp: Response) => {
  try {
    let fishes = await getFish(); //getting them all
    return resp.json({
      status: 200,
      fishes,
    });
  } catch (ex) {
    return resp.json({ msg: ex });
  }
};
