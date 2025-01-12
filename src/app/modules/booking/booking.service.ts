/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import { Booking } from "./booking.model";

import { TEvent } from "../event/event.interface";
import { Event } from "../event/event.model";
import { io } from "../../../server";

const createBooking = async (
  user: Types.ObjectId,
  bookingData: any
): Promise<TBooking | null> => {
  const userId = user;
  const eventId = bookingData?.event;
  const ticketsToBook = bookingData?.ticket;
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
  }

  const UserData: TUser | null = await User.findById(userId);
  const EventData: TEvent | null = await Event.findById(eventId);

  if (!UserData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!EventData) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }
  if (EventData.maxAttendees <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No spots left for this event");
  }
  if (EventData.maxAttendees < ticketsToBook) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Only ${EventData.maxAttendees} spots left for this event`
    );
  }

  if (EventData.status === "unavailable") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This event is unavailable right now"
    );
  }

  const session = await Event.startSession();
  session.startTransaction();

  let booking: TBooking | null = null;

  try {
    // Decrease maxAttendees by 1
    EventData.maxAttendees -= ticketsToBook;

    // Update the event status if no spots are left
    if (EventData.maxAttendees === 0) {
      EventData.status = "unavailable";
    }

    await EventData.save({ session });

    // Create a new booking entry
    booking = new Booking({
      ...bookingData,
      user: userId,
      event: eventId,
    });
    await booking.save({ session });

    await session.commitTransaction();
    // Assuming eventDetails.createdBy is an embedded user object with _id
    const organizerId = EventData.createdBy._id.toString(); // Extracts the user ID

    // Emit the new booking notification to the organizer
    io.to(organizerId).emit("newBooking", {
      message: `New booking for your event '${EventData.name}'`,
      booking,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  // Populate the booking with user and event details
  const populatedBooking = await Booking.findById(booking?._id)
    .populate({
      path: "user",
    })
    .populate({
      path: "event",
    });

  return populatedBooking;
};

const getUserBookings = async (_id: string) => {
  const result = await Booking.find({ user: _id })
    .populate({
      path: "user",
    })
    .populate({
      path: "event",
    });
  return result;
};

export const BookingServices = {
  createBooking,
  getUserBookings,
};
