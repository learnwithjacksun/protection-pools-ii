import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rawPassword: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiresAt: {
      type: Date,
      required: false,
    },
    secretKey: {
      type: String,
      required: false,
    },
    secretKeyExpiresAt: {
      type: Date,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
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
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiresAt;
        delete ret.secretKey;
        delete ret.secretKeyExpiresAt;
        return ret;
      },
    },
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
