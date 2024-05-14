import mongoose from "mongoose";

const barData = mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  rank_range: {
    type: String,
    required: true,
  },
  nation: {
    type: String,
    required: true,
    enum: {
      values: ["United States", "Canada", "Germany", "Australia"],
      message: "{VALUE} is not a supported",
    },
  },
  branch: {
    type: String,
    required: true,
  },
});

const rangeData = mongoose.model("range", barData);
export default rangeData;
