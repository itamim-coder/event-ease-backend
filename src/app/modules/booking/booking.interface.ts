/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { TEvent } from "../event/event.interface";
import { ClientSession } from "mongodb";

export interface TBooking {
  save(arg0: { session: ClientSession }): unknown;
  _id: Types.ObjectId;
  bookingStatus: string;
  paymentStatus: string;
  ticket: number;
  user: Types.ObjectId | TUser; // Reference to the User model
  event: Types.ObjectId | TEvent; // Reference to the Car model
}
