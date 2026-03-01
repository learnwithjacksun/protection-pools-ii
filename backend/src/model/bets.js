import { Schema, model } from "mongoose";

const betSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    week: {
      type: Number,
      required: true,
    },
    matches: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Match",
          required: true,
        },
      ],
    },
    bookingCode: {
      type: String,
      required: true,
    },
    stakeAmount: {
      type: Number,
      required: true,
    },
    betType: {
      type: String,
      required: true,
      enum: ["perming", "nap"],
    },
    status: {
      type: String,
      required: true,
      default: "awaiting",
      enum: ["awaiting", "done"],
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
  }
);

const BetModel = model("Bet", betSchema);
export default BetModel;
