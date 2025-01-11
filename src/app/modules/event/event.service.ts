import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TEvent } from "./event.interface";
import { Event } from "./event.model";

const createEvent = async (car: TEvent): Promise<TEvent | null> => {
  const createdEvent = await Event.create(car);

  if (!createdEvent) {
    throw new AppError(400, "Failed to create event!");
  }

  return createdEvent;
};

const getAllEvents = async () => {
  const result = await Event.find();
  return result;
};

const getSingleEvent = async (_id: string): Promise<TEvent | null> => {
  const result = await Event.findById({ _id });

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

export const EventServices = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
};
