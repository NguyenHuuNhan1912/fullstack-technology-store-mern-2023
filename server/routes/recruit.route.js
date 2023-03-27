import express from "express";
import * as recruit from "../controllers/recruit.controller.js";

const router = express.Router();

router
  .route("/")
  .post(recruit.create)
  .get(recruit.getAll)

// router
//   .route('/:id')
//   .put(recruit.updateOne)
//   .delete(recruit.deleteOne)
//   .get(recruit.getOne)

export default router;