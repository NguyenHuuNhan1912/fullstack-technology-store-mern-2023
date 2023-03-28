import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

export default mongoose.model(
  "Product",
  Schema(
    {
    name: {type: String},
    slug: {type: String, slug: "name", unique: true},
    type: {type: String},
    brand: {type: String},
    price: {type: Number},
    quantity: {type: String},
    discount: {type: String},
    information: {type: Object},
    img: {type: String},
    publish: {type: String}
    },
    { timestamps: true }
  )
);
