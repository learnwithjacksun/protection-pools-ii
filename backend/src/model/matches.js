import { Schema, model } from "mongoose";

const matchSchema = new Schema(
  {
    week: {
      type: Number,
      required: true,
    },
    matchNo: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: ["pending", "completed"],
      default: "pending",
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    homeScore: {
      type: Number,
      required: false,
      default: 0,
    },
    awayScore: {
      type: Number,
      required: false,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const MatchModel = model("Match", matchSchema);

export default MatchModel;
