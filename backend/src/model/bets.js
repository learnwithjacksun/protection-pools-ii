import { Schema, model } from "mongoose";

const betSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["Perming", "Nap"],
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "won", "lost", "cancelled"],
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
