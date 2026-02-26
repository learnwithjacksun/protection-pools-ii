import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    currentWeek: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const AdminModel = model("admin", adminSchema);

export default AdminModel;
