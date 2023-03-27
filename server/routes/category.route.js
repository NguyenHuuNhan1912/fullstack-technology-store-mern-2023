import express from "express";
import * as category from "../controllers/category.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    category.create
  )
  .get(category.getAll);
 
router
  .route('/:id')
  .put(category.updateOne)
  .delete(category.deleteOne);
export default router;