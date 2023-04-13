import express from "express";
import * as productApp from "../controllers/productApp.controller.js";

const router = express.Router();

router
  .route("/")
  .get(productApp.getAll);
  
router
  .route("/all")
  .get(productApp.getProducts);


export default router;