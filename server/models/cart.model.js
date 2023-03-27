import mongoose, { Schema } from "mongoose";




export default mongoose.model(
  "Cart",
  Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      product: [
        {
          idRef: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: String,
            
          }
        },
      ],
      total: {
        type: String,
        default: 0
      }
    },
    { timestamps: true }
  )
);
