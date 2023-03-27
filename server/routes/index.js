import express from "express";
const router = express.Router();

import cartRoute from "./cart.route.js";
import categoryRoute from './category.route.js';
import productRoute from './product.route.js';
import contactRoute from './contact.route.js';
import discountRoute from './discount.route.js';
import productAppRoute from './productApp.route.js';
import userRoute from './user.route.js';
import orderRoute from './order.route.js';
import recruitRoute from './recruit.route.js';


router.use("/cart", cartRoute);
router.use("/category", categoryRoute);
router.use("/products", productRoute);
router.use("/contact", contactRoute);
router.use("/discount", discountRoute);
router.use("/productApp", productAppRoute);
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/recruit", recruitRoute);





export default router;