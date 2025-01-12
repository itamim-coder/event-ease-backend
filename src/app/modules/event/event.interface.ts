/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export interface TEvent {
  save(arg0: { session: import("mongodb").ClientSession }): unknown;
  _id: Types.ObjectId;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  status?: "available" | "unavailable";
  createdBy: Types.ObjectId | TUser;
}
