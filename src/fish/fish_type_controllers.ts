import { Request, Response } from "express";
import storage from "./storage";
import {
  deleteTypePhoto,
  fishTypePhoto,
  getFishTypes,
  newFishTypeModel,
  updateFishType,
} from "./fish_type_model";

import multer from "multer";
export const fishTypeGallery = multer({ storage }); //this is fish gallery

export const addFishTypeController = async (req: Request, resp: Response) => {
  try {
    let results = await newFishTypeModel({
      name: req.body.name,
      price: req.body.price,
      unitSize: req.body.unitSize,
      currency: req.body.currency,
      status: req.body.status,
    });
    resp.json({
      status: true,
      fish: results,
    });
  } catch (ex) {
    resp.json({
      status: false,
      msg: ex,
    });
  }
};

//getting all the types for the fish right now
export const getFishTypesCtrl = async (req: Request, resp: Response) => {
  try {
    let results = await getFishTypes(false, undefined); //we should put names on the things we fly blindly here!!
    return resp.json({
      status: true,
      types: results,
    });
  } catch (ex) {
    resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const updateFishTypeCtrl = async (req: Request, resp: Response) => {
  try {
    let { id } = req.params; //getting an id
    let results = await updateFishType({
      ...req.body,
      id: Number(id),
    });
    return resp.json({
      status: true,
      fishtype: results,
    });
  } catch (ex) {
    resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const addTypeImagesCtrl = async (req: Request, resp: Response) => {
  if (!req.file) {
    return resp.json({
      status: false,
      msg: "Failed to upload a photo",
    });
  }
  let results = await fishTypePhoto({
    path: req.file?.filename,
    fishTypeId: Number(req.body.typeId),
  });
  resp.json({
    status: true,
    photo: results,
  });
  try {
  } catch (ex) {
    resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const getSingleTypeCtrl = async (req: Request, resp: Response) => {
  let { id } = req.params;
  try {
    let results = await getFishTypes(true, Number(id));
    resp.status(200);
    return resp.json({
      status: true,
      fish: results,
    });
  } catch (ex) {
    resp.status(500); //something internally i think!
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const deleteTypePhotoCtrl = async (req: Request, resp: Response) => {
  let { id } = req.params;
  try {
    let results = await deleteTypePhoto(Number(id));
    resp.status(200);
    return resp.json({
      status: true,
      results,
    });
  } catch (ex) {
    resp.status(500);
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};

export const galleryCtrl = async (req: Request, resp: Response) => {
  //we're going to do some really cool cool things in here!!
  try {
    let results = await getFishTypes(true, undefined);
    resp.status(200);
    return resp.json({
      status: true,
      types: results,
    });
  } catch (ex) {
    resp.status(500);
    return resp.json({
      status: false,
      msg: ex,
    });
  }
};
