import { Request, Response } from "express";
import { FishToStore, addFish, getFish } from "./fish_model";

export const createFish = async (req: Request, resp: Response) => {
  let results = await addFish({
    //.. now lets put some data for the fish right now!!
    fishTypeId: Number(req.body.fishTypeId),
    fishedAt: req.body.fishedAt,
    submittingDate: new Date(), //so this is a datetime right now
    amount: Number(req.body.amount),
    fisherId: req.context.user.userId,
  } as FishToStore);
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
