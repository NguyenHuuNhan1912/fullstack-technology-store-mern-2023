import mongoose, {Schema} from "mongoose";


export default mongoose.model(
    "Order",
    Schema(
      {
      name: {type: String},
      idUser: {type: String},
      numberPhone: {type: String},
      province: {type: String},
      districts: {type: String},
      hometown: {type: String},
      address: {type: String},
      total: {type: String},
      cart: {type: Object},
      status: {type: String, default: "delivered"} // delivered: da giao, pending: Chua giai quyet,processing: dang giao, cancel: huy don hang, 
      },
      { timestamps: true }
    )
  );