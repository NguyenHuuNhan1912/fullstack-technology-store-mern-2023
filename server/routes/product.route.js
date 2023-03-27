import express from "express";
import * as product from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/")
  .post(product.create)
  .get(product.getAll)

router
  .route("/filtersName")
  .get(product.filtersName)

router
  .route('/:id')
  .put(product.updateOne)
  .delete(product.deleteOne)
  .get(product.getOne)



export default router;