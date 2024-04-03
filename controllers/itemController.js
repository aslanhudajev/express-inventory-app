import Category from "../models/category.js";
import Item from "../models/item.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import * as ImageController from "./imageController.js";

export const getItems = asyncHandler(async (req, res, next) => {
  const items = await Item.find({})
    .sort({ name: 1 })
    .populate("category")
    .exec();
  res.render("./item/ItemList", { items });
});

export const getItemDetails = asyncHandler(async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec();
  res.render("./item/ItemDetails", { item });
});

export const getItemForm = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("./item/ItemForm.pug", { title: "Create item", categories });
});

export const createItem = [
  body("name", "Name can not be empty")
    .isLength({ min: 2, max: 40 })
    .withMessage("Name can not be shorter than 2 characters or longer than 20")
    .trim(),
  body("description", "Description can not be empty")
    .isLength({ min: 2, max: 40 })
    .withMessage(
      "Description can not be shorter than 2 characters or longer than 20",
    )
    .trim(),
  body("category", "Category can not be empty").notEmpty().trim(),
  body("price", "Price can not be empty")
    .isInt({ min: 0, max: 999999, allow_leading_zeroes: false })
    .withMessage("Price has to be a number between 0 and 999999"),
  body("stock", "Stock can not be empty")
    .isInt({ min: 0, max: 999999, allow_leading_zeroes: false })
    .withMessage("Stock has to be a number between 0 and 999999"),

  async (req, res, next) => {
    console.log(req);
    const categories = await Category.find({}).sort({ name: 1 }).exec();
    const newItem = new Item({ ...req.body });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("./item/ItemForm", {
        categories,
        newItem,
        errors: errors.array(),
      });
    } else {
      const imageID = await ImageController.uploadImage(req.file.path);
      newItem.image_id = imageID;
      newItem.image = `http://res.cloudinary.com/df9tvuixn/image/upload/h_500/v1712169005/${imageID}.png`;

      await newItem.save();
      res.redirect(newItem.url);
    }
  },
];

export const getItemDeleteDialog = asyncHandler(async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec();
  res.render("./item/ItemDeleteDialog", { item });
});

export const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id });
  await ImageController.destroyImage(item.image_id);
  await Item.deleteOne({ _id: req.params.id });
  res.redirect("/items");
});

export const getItemUpdateForm = asyncHandler(async (req, res, next) => {
  const [categories, newItem] = await Promise.all([
    Category.find({}).sort({ name: 1 }).exec(),
    Item.findOne({ _id: req.params.id }).exec(),
  ]);

  res.render("./item/ItemForm", { title: "Edit item", categories, newItem });
});

export const updateItem = [
  body("name", "Name can not be empty")
    .isLength({ min: 2, max: 40 })
    .withMessage("Name can not be shorter than 2 characters or longer than 20")
    .trim(),
  body("description", "Description can not be empty")
    .isLength({ min: 2, max: 40 })
    .withMessage(
      "Description can not be shorter than 2 characters or longer than 20",
    )
    .trim(),
  body("category", "Category can not be empty").notEmpty().trim(),
  body("price", "Price can not be empty")
    .isInt({ min: 0, max: 999999, allow_leading_zeroes: false })
    .withMessage("Price has to be a number between 0 and 999999"),
  body("stock", "Stock can not be empty")
    .isInt({ min: 0, max: 999999, allow_leading_zeroes: false })
    .withMessage("Stock has to be a number between 0 and 999999"),

  async (req, res, next) => {
    const [categories, newItem] = await Promise.all([
      Category.find({}).sort({ name: 1 }).exec(),
      Item.findOne({ _id: req.params.id }).exec(),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("./item/ItemForm", {
        categories,
        newItem,
        errors: errors.array(),
      });
    } else {
      ImageController.destroyImage(newItem.image_id);

      const imageID = await ImageController.uploadImage(req.file.path);
      await Item.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          image_id: imageID,
          image: `http://res.cloudinary.com/df9tvuixn/image/upload/h_500/v1712169005/${imageID}.png`,
        },
      );
      res.redirect(newItem.url);
    }
  },
];
