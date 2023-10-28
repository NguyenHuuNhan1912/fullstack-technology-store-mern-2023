import express from "express";
import * as comment from "../controllers/comment.controller.js";

const router = express.Router();

router
  .route("/")
  .post(comment.create)
  .get(comment.getAll)

router
  .route('/:id')
  .delete(comment.deleteOne)

export default router;