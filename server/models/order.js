import mongoose from "mongoose";

const { Schema } = mongoose;


const orderSchema = new Schema(
  {
    hotel: {
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    },
    session: {},
    orderedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
