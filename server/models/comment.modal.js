import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Comment",
  Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      heart: {type: Boolean},
      rate: {type: Number},
      comment: {type: String},
      commentTime: {type: String},
      idProduct: {type: String},
    },
    { timestamps: true }
  )
);
