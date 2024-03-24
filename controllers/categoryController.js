import asyncHandler from "express-async-handler";

export const getCategories = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch all categories
  res.render("CategoryList", { categories });
});

export const getCategoryDetails = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch category details
  res.render("CategoryDetails", { category });
});
