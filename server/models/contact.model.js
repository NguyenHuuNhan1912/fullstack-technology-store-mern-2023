import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);
export default mongoose.model(
  "Contact",
  Schema(
    {
    name: {type: String},
    numberPhone: {type: String},
    email: {type: String},
    content: {type: String},
    },
    { timestamps: true }
  )
);
