import express from "express";
import * as ItemController from "../controllers/itemController.js";
import * as CategoryController from "../controllers/categoryController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "/uploads" });

router.get("/", (req, res, next) => {
  res.render("HomePage");
});

//categories
router.get("/categories", CategoryController.getCategories);
router.get("/category/:id", CategoryController.getCategoryDetails);
router.get("/categories/create", CategoryController.getCategoryForm);
router.get("/category/:id/delete", CategoryController.getCategoryDeleteDialog);
router.get(
  "/category/:id/deleteItems",
  CategoryController.getCategoryItemsDeleteDialog,
);
router.get("/category/:id/update", CategoryController.getCategoryUpdateForm);
router.post("/categories/create", CategoryController.createCategory);
router.post("/category/:id/delete", CategoryController.deleteCategory);
router.post(
  "/category/:id/deleteItems",
  CategoryController.deleteCategoryItems,
);
router.post("/category/:id/update", CategoryController.updateCategory);

//items
router.get("/items", ItemController.getItems);
router.get("/item/:id", ItemController.getItemDetails);
router.get("/items/create", ItemController.getItemForm);
router.get("/item/:id/delete", ItemController.getItemDeleteDialog);
router.get("/item/:id/update", ItemController.getItemUpdateForm);
router.post("/items/create", upload.single("image"), ItemController.createItem);
router.post("/item/:id/delete", ItemController.deleteItem);
router.post(
  "/item/:id/update",
  upload.single("image"),
  ItemController.updateItem,
);

export default router;
