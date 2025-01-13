import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TEvent } from "./event.interface";
import { Event } from "./event.model";
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { io } from "../../../server";

const createEvent = async (
  user: Types.ObjectId,
  event: TEvent
): Promise<TEvent | null> => {
  const userId = user;
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
  }

  const UserData: TUser | null = await User.findById(userId);

  if (!UserData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  event.createdBy = userId;
  const createdEvent = await Event.create(event);

  if (!createdEvent) {
    throw new AppError(400, "Failed to create event!");
  }

  return createdEvent;
};

const getAllEvents = async () => {
  const result = await Event.find()
    .populate({
      path: "createdBy",
    })
    .sort({ createdAt: -1 }); // Sorting by createdAt in descending order

  return result;
};
const getSingleEvent = async (_id: string): Promise<TEvent | null> => {
  const result = await Event.findById({ _id }).populate({
    path: "createdBy",
  });

  return result;
};
const getEventCreatedByUser = async (_id: string): Promise<TEvent[]> => {
  // Use .find() to get all events where createdBy is equal to the user ID
  // console.log(_id, "user");
  const result = await Event.find({ createdBy: _id }).populate({
    path: "createdBy", // Populate with the createdBy user object
  });

  return result;
};

const updateEvent = async (
  _id: string,
  payload: Partial<TEvent>
): Promise<TEvent | null> => {
  const isExist = await Event.findById({ _id });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found!");
  }

  const { ...EventData } = payload;

  const updatedEventData: Partial<TEvent> = { ...EventData };

  const result = await Event.findOneAndUpdate({ _id }, updatedEventData, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update event.");
  }



  // Broadcast to all users
  io.emit("eventUpdated", {
    message: `The event '${EventData.name}' was updated.`,
    event: result,
  });

  return result;
};


const deleteEvent = async (_id: string): Promise<TEvent | null> => {
  const result = await Event.findByIdAndDelete(_id);

  return result;
};

export const EventServices = {
  createEvent,
  getAllEvents,
  getEventCreatedByUser,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
