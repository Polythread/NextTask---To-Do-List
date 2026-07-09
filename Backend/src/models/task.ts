import mongoose, { Document, Schema, Types } from "mongoose";

export interface Itask extends Document {
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: Date;
  userId: Types.ObjectId;
}

const taskSchema = new Schema<Itask>({
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
});
