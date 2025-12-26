import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
    },

    type: {
      type: String,
      required: true,
      enum: ["personal", "work", "family", "other"],
      default: "personal",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

