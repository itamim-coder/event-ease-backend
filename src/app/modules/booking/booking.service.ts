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
    // Create a new booking entry first
    booking = new Booking({
      ...bookingData,
      user: userId,
      event: eventId,
    });
    await booking.save({ session });

    // Notify the organizer about the new booking
    io.to(EventData.createdBy._id.toString()).emit("newBooking", {
      message: `'${UserData.name}' booked your event '${EventData.name}'`,
      booking,
    });

    // Decrease maxAttendees by the tickets to book
    EventData.maxAttendees -= ticketsToBook;

    // Check and update the event status if no spots are left
    if (EventData.maxAttendees === 0) {
      EventData.status = "unavailable";

      // Notify the organizer of the status change first
      io.to(EventData.createdBy._id.toString()).emit("statusChanged", {
        message: `Your event '${EventData.name}' status changed to ${EventData.status}`,
        EventData,
      });

      // Now notify all users who booked the event about the status change
      const buyers = await Booking.find({ event: bookingData?.event }).populate(
        "user"
      );
      buyers.forEach((booking) => {
        io.to(booking.user._id.toString()).emit("statusChanged", {
          message: `The event '${EventData.name}' status has changed to ${EventData.status}`,
          EventData,
        });
      });
    }

    await EventData.save({ session });

    await session.commitTransaction();
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
