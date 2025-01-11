import { Types } from "mongoose";

export interface TEvent {
  _id: Types.ObjectId;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  status?: "available" | "unavailable";
  createdBy: string;
}
