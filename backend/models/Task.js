import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    title: { type: String, require: true },
    description: { type: String, require: false },
    isDeleted: { type: Boolean, require: true, default: false },
    deletedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = model("Task", TaskSchema);
