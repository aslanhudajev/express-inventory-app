import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Category from "../models/category.js";
import Item from "../models/item.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("./category/CategoryList", { categories });
});

export const getCategoryDetails = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findOne({ _id: req.params.id }).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  res.render("./category/CategoryDetails", { category, items });
});

export const getCategoryForm = (req, res, next) => {
  res.render("./category/CategoryForm.pug");
};

export const createCategory = [
  body("name", "Name can not be empty")
    .isLength({ min: 2 })
    .withMessage("Name has to be atleast 2 characters long")
    .trim(),
  body("description", "Description can not be empty")
    .isLength({ min: 4 })
    .withMessage("Description has to be atleast 4 characters long")
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = new Category({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      res.render("./category/CategoryForm", {
        newCategory,
        errors: errors.array(),
      });
      return;
    } else {
      await newCategory.save();
      res.redirect(newCategory.url);
    }
  }),
];

export const getCategoryDeleteDialog = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findOne({ _id: req.params.id }).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  res.render("./category/CategoryDeleteDialog", { category, items });
});

export const getCategoryItemsDeleteDialog = asyncHandler(
  async (req, res, next) => {
    const [category, items] = await Promise.all([
      Category.findOne({ _id: req.params.id }).exec(),
      Item.find({ category: req.params.id }).exec(),
    ]);
    res.render("./category/CategoryItemsDeleteDialog", { category, items });
  },
);

export const deleteCategory = asyncHandler(async (req, res, next) => {
  await Item.deleteMany({ category: req.params.id });
  await Category.deleteOne({ _id: req.params.id });
  res.redirect("/categories");
});

export const deleteCategoryItems = asyncHandler(async (req, res, next) => {
  await Item.deleteMany({ category: req.params.id });
  res.redirect(`/category/${req.params.id}`);
});

export const getCategoryUpdateForm = asyncHandler(async (req, res, next) => {
  const newCategory = await Category.findOne({ _id: req.params.id }).exec();
  res.render("./category/CategoryForm", { newCategory });
});

export const updateCategory = [
  body("name", "Name can not be empty")
    .isLength({ min: 2 })
    .withMessage("Name has to be atleast 2 characters long")
    .trim(),
  body("description", "Description can not be empty")
    .isLength({ min: 4 })
    .withMessage("Description has to be atleast 4 characters long")
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = await Category.findOne({ _id: req.params.id }).exec();

    if (!errors.isEmpty()) {
      res.render("./category/CategoryForm", {
        newCategory,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.updateOne({ _id: req.params.id }, { ...req.body });
      res.redirect(newCategory.url);
    }
  }),
];
