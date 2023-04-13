import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);
export default mongoose.model(
  "Category",
  Schema(
    {
    name: {type: String},
    slug: {type: String, slug: "name", unique: true},
    brand: [{type: String}],
    field: [{type: String}],
    img: {type: String},
    },
    { timestamps: true }
  )
);
