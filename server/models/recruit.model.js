import mongoose, {Schema} from "mongoose";


export default mongoose.model(
    "Recruit",
    Schema(
      {
      name: {type: String},
      sex: {type: String},
      birthDay: {type: String},
      numberPhone: {type: String},
      level: {type: String},
      linkFb: {type: String},
      exper: {type: String},
      address: {type: String},
      position: {type: String},
      },
      { timestamps: true }
    )
  );