import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);
export default mongoose.model(
  "Category",
  Schema(
    {
    //   title: { type: String, unique: true},
    //   slug: { type: String, slug: "title", unique: true },
    //   subTitle: { type: String },
    //   description: { type: String, default: "" },
    //   genders: [{ type: String }],
    //   category: { type: String },
    //   price: { type: Number, default: 0 },
    //   options: [{ type: Object }],
    name: {type: String},
    slug: {type: String, slug: "name", unique: true},
    brand: [{type: String}],
    field: [{type: String}],
    img: {type: String},
    },
    { timestamps: true }
  )
);
