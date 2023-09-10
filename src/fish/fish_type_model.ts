import { prisma } from "../utils/db";

//a new fish type to be created!!
export type FishType = {
  name: string;
  id: number;
  price: number;
  unitSize: number;
  currency: string;
  status: string;
};

//create a new fish
export const newFishTypeModel = async (fish: Omit<FishType, "id">) => {
  let results = await prisma.fishType.create({
    data: fish,
  });
  return results;
};

//getting all the fishtypes
export const getFishTypes = async (photos = false, id: number | undefined) => {
  //dont know what i'll do if pagination is required
  if (id) {
    return prisma.fishType.findMany({ where: { id }, include: { photos } });
  }
  return prisma.fishType.findMany({ include: { photos } });
};

//we're going to come to this part
export const updateFishType = async (fish_type: FishType) => {
  let { id, ...rest } = fish_type;
  return prisma.fishType.update({
    where: { id },
    data: rest,
  });
};

type Photo = {
  path: string;
  fishTypeId: number;
};
export const fishTypePhoto = async (photo: Photo) => {
  return prisma.fishPhoto.create({
    data: photo,
  }); //that all we need to hear
};

export const deleteTypePhoto = (id: number) => {
  return prisma.fishPhoto.delete({
    where: { id },
  }); //dont know to tell if its successful or not right now!!
};
