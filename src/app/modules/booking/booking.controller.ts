/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: any, res) => {
  const { userId } = req.user;

  const { ...bookingData } = req.body;

  const result = await BookingServices.createBooking(userId, bookingData);
  sendResponse<TBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event Booked successfully!",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: any, res) => {
  const { userId } = req.user;

  if (userId) {
    const result = await BookingServices.getUserBookings(userId);

    if (result.length > 0) {
      sendResponse<TBooking[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Bookings retrieved successfully",

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
  }
});

export const BookingControllers = {
  createBooking,
  getUserBookings,
};
