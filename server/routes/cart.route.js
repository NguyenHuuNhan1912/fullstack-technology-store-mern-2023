import express from "express";
import * as cart from "../controllers/cart.controller.js";

const router = express.Router();

router
  .route("/")
  .post(cart.create)
  .get(cart.getAll);
  
router
  .route("/searchIdUser")
  .get(cart.searchIdUser)
 
router
  .route("/:id")
  .put(cart.updateOne)
  .delete(cart.deleteOne)
  .get(cart.getOne)

export default router;