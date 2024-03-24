import asyncHandler from "express-async-handler";
import Category from "../models/category.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch all categories
  const categories = await Category.find({}).sort({ name: 1 }).exec();
  res.render("./category/CategoryList", { categories });
});

export const getCategoryDetails = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch category details
  const category = await Category.find({ _id: req.params.id })
    .populate("category", "name")
    .exec();
  res.render("./category/CategoryDetails", { category });
});
