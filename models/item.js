import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    minLength: 1,
    maxLenghth: 30,
  },
  description: {
    type: String,
    minLength: 1,
    maxLenghth: 256,
  },
  category: {
    type: mongoose.Types.ObjectId,
  },
  price: Number,
  stock: Number,
});

itemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

export default mongoose.model("Item", itemSchema);
