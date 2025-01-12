import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TEvent } from "./event.interface";
import { Event } from "./event.model";
import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

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
  const result = await Event.find().populate({
    path: "createdBy",
  });
  return result;
};

const getSingleEvent = async (_id: string): Promise<TEvent | null> => {
  const result = await Event.findById({ _id }).populate({
    path: "user",
  });

  return result;
};

const updateEvent = async (
  _id: string,

  payload: Partial<TEvent>
): Promise<TEvent | null> => {
  const isExist = await Event.findById({ _id });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found !");
  }

  const { ...EventData } = payload;

  const updatedEventData: Partial<TEvent> = { ...EventData };

  const result = await Event.findOneAndUpdate({ _id }, updatedEventData, {
    new: true,
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
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
