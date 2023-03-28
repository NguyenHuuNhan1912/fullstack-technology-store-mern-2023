import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);
export default mongoose.model(
    "User",
    Schema(
        {
            username: { type: String},
            numberPhone: { type: String},
            password: { type: String },
            img: {type: String},
            birthDay: {type: String},
            sex: {type: String},
            email: {type: String},
            admin: {type: Boolean, default: false}
        },
        { timestamps: true }
    )
);
