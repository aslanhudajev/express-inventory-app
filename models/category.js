import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 256,
  },
});

categorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

export default mongoose.model("Category", categorySchema);
