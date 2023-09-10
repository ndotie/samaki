import express from "express";
import {
  addFishTypeController,
  addTypeImagesCtrl,
  deleteTypePhotoCtrl,
  galleryCtrl,
  getFishTypesCtrl,
  getSingleTypeCtrl,
  updateFishTypeCtrl,
} from "./fish_type_controllers";
import { fishTypeGallery } from "./fish_type_controllers";
const router = express.Router();

//just creating a brand new fish right there!!!
router.post("/add", addFishTypeController);
router.put("/update/:id", updateFishTypeCtrl);
router.post("/photos", fishTypeGallery.single("photos"), addTypeImagesCtrl);
router.get("/all", getFishTypesCtrl);
router.get("/typephoto/:id", getSingleTypeCtrl);
router.delete("/delete-photo/:id", deleteTypePhotoCtrl);
router.get("/gallery", galleryCtrl);

export default router;
