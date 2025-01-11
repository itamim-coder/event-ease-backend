/* eslint-disable no-unused-vars */
import { Types } from "mongoose";

export interface TEvent {
  save(arg0: { session: import("mongodb").ClientSession }): unknown;
  _id: Types.ObjectId;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  status?: "available" | "unavailable";
  createdBy: string;
}
