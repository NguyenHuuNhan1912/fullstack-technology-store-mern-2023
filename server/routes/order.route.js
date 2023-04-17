import express from "express";
import * as order from "../controllers/order.controller.js";

const router = express.Router();

router
  .route("/")
  .post(order.create)
  .get(order.getAll)
router
  .route("/searchCart")
  .get(order.searchCart)

router
  .route("/filtersStatus")
  .get(order.filtersStatus)
router
  .route('/:id')
  .put(order.updateOne)
  .delete(order.deleteOne)
  .get(order.getOne)

export default router;