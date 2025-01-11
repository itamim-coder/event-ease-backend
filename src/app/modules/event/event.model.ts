import { model, Schema } from "mongoose";
import { TEvent } from "./event.interface";

const eventSchema = new Schema<TEvent>(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);


export const Event = model<TEvent>("Event", eventSchema);
