import express from "express";
import * as contact from "../controllers/contact.controller.js";

const router = express.Router();

router
  .route("/")
  .post(contact.create)
  .get(contact.getAll);

export default router;