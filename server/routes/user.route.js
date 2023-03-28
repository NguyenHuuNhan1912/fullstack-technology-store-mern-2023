import express from "express";
import * as user from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .post(user.create)
  .get(user.getAll);
router 
  .route("/checkSignup")
  .get(user.signUp)
router 
  .route("/checkSignin")
  .get(user.signIn)
router
  .route('/:id')
  .get(user.getOne)
  .put(user.updateOne)

export default router;