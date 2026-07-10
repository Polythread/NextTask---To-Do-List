import mongoose, { Document, Schema, Types } from "mongoose";

export interface Itask extends Document {
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: Date;
  userId: Schema.Types.ObjectId;
}

const taskSchema = new Schema<Itask>(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 60,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    createdAt: {
      type: Date,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Itask>("Task", taskSchema);
