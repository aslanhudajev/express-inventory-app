import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
});

export const uploadImage = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      use_filename: false,
      unique_filename: true,
      overwrite: true,
    });
    return result.public_id;
  } catch (error) {
    console.log(error);
  }
};

export const destroyImage = async (imageID) => {
  try {
    const result = await cloudinary.uploader.destroy(imageID);
    return result;
  } catch (error) {
    console.log(error);
  }
};
