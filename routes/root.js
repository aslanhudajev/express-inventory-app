import express from "express";
import * as ItemController from "../controllers/itemController.js";
import * as CategoryController from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("HomePage");
});

//categories
router.get("/categories", CategoryController.getCategories);
router.get("/category/:id", CategoryController.getCategoryDetails);

//items
router.get("/items", ItemController.getItems);
router.get("/item/:id", ItemController.getItemDetails);

export default router;
