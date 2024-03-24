import asyncHandler from "express-async-handler";

export const getItems = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch item details
  res.render("ItemList", { items });
});

export const getItemDetails = asyncHandler(async (req, res, next) => {
  // ! ADD: Logic to fetch item details
  res.render("ItemDetails", { item });
});
