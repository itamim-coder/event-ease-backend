/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import httpStatus from "http-status";
import { EventServices } from "./event.service";
import { TEvent } from "./event.interface";

const createEvent = catchAsync(async (req: any, res) => {
  const { userId } = req.user;
  const EventData = req.body;
  const result = await EventServices.createEvent(userId, EventData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Event Created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEvents();

  if (result.length > 0) {
    sendResponse<TEvent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Events retrieved successfully !",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data found!",
      data: [],
    });
  }
});

const getEventCreatedByUser = catchAsync(async (req: any, res) => {
  const { userId } = req.user;

  const result = await EventServices.getEventCreatedByUser(userId);

  sendResponse<TEvent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Event retrieved successfully !",
    data: result,
  });
});
const getSingleEvent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await EventServices.getSingleEvent(id);

  sendResponse<TEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Event retrieved successfully !",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
console.log(id)
console.log(req)
  const result = await EventServices.updateEvent(id, updatedData);

  sendResponse<TEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully !",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await EventServices.deleteEvent(id);

  sendResponse<TEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully !",
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getEventCreatedByUser,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
