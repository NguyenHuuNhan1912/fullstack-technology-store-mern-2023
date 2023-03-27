import express from 'express';
import * as product from "../controllers/product.controller.js";
const  router =  express.Router();


router
    .route('/')
    .get(product.fillDiscount)

export default router;
