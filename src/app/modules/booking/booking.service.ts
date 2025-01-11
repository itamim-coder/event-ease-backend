// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-undef */
// import { Types } from "mongoose";
// import { TBooking } from "./booking.interface";
// import httpStatus from "http-status";
// import AppError from "../../errors/AppError";
// import { TUser } from "../user/user.interface";
// import { User } from "../user/user.model";
// import { Car } from "../car/car.model";

// import { TCar } from "../car/car.interface";
// import { Booking } from "./booking.model";
// import { calculateTotalCost, generateTransactionId } from "./booking.utils";
// import QueryBuilder from "../../builder/QueryBuilder";

// const createBooking = async (
//   user: Types.ObjectId,
//   bookingData: any
// ): Promise<TBooking | null> => {
//   const userId = user;
//   const carId = bookingData?.car;

//   console.log(userId);
//   console.log(carId);
//   if (!Types.ObjectId.isValid(userId)) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Invalid user ID");
//   }

//   const UserData: TUser | null = await User.findById(userId);
//   const CarData: TCar | null = await Car.findById(carId);

//   // Check if the cow and buyer exist
//   if (!UserData) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }
//   if (!CarData) {
//     throw new AppError(httpStatus.NOT_FOUND, "Car not found");
//   }

//   // Check if the car is already unavailable
//   if (CarData.status === "unavailable") {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "This car is unavailable right now"
//     );
//   }

//   const session = await Car.startSession();
//   session.startTransaction();
//   const transactionId = generateTransactionId();
//   let booking: TBooking | null = null;
//   try {
//     // Update the cow's label to 'sold out'
//     CarData.status = "unavailable";
//     await CarData.save({ session });
//     // Create a new order entry
//     booking = new Booking({
//       ...bookingData,
//       user: userId,
//       car: carId,
//       transactionId,
//     });
//     await booking.save({ session });

//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }

//   const populatedBooking = await Booking.findById(booking?._id)
//     .populate({
//       path: "user",
//     })
//     .populate({
//       path: "car",
//     });
//   return populatedBooking;
// };

// const getUserBookings = async (_id: string) => {
//   const result = await Booking.find({ user: _id })
//     .populate({
//       path: "user",
//     })
//     .populate({
//       path: "car",
//     });
//   return result;
// };
// const getUserApprovedBookings = async (_id: string) => {
//   const result = await Booking.find({ user: _id, bookingStatus: "Approved" }) // Add bookingStatus filter
//     .populate({
//       path: "user",
//     })
//     .populate({
//       path: "car",
//     });
//   return result;
// };

// const returnCar = async (payload: any) => {
//   const bookingId = payload.bookingId;
//   const endTime = payload.endTime;
//   const booking = await Booking.findById({ _id: bookingId })
//     .populate("user")
//     .populate("car");

//   // Check if the cow and buyer exist
//   if (!booking) {
//     throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
//   }
//   // Ensure car is populated and has the correct type
//   if (!("pricePerHour" in booking.car)) {
//     throw new AppError(httpStatus.NOT_FOUND, "Car not found");
//   }
//   // Check if the car is already unavailable

//   const session = await Booking.startSession();
//   session.startTransaction();
//   // let booking: TBooking | null = null;
//   try {
//     if (booking.startTime && endTime) {
//       const totalCost = calculateTotalCost(
//         booking.startTime,
//         payload.endTime,
//         booking.car.pricePerHour
//       );
//       console.log(totalCost);
//       booking.totalCost = totalCost;
//       booking.endTime = endTime;
//     }

//     // booking.car.status = "available";
//     await booking.save({ session });

//     // Create a new order entry
//     await Car.findByIdAndUpdate(
//       { _id: booking.car._id },
//       { status: "available" },
//       { session }
//     );

//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }

//   const updatedData = await Booking.findById({ _id: bookingId })
//     .populate("user")
//     .populate("car");

//   return updatedData;
// };

// const getAllBookings = async (query: Record<string, unknown>) => {
//   const BookingQuery = new QueryBuilder(
//     Booking.find().populate("user").populate("car"),
//     query
//   ).filter();

//   const result = await BookingQuery.modelQuery;

//   return result;
// };

// const changeBookingStatus = async (
//   _id: string,
//   payload: Partial<{ bookingStatus: string }>
// ): Promise<TBooking | null> => {
//   // Check if the booking exists
//   const isExist = await Booking.findById(_id);

//   if (!isExist) {
//     throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
//   }

//   // Ensure that the bookingStatus field is part of the payload
//   const { bookingStatus } = payload;
//   if (!bookingStatus) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Booking status is required!");
//   }

//   // Update the booking with the new bookingStatus
//   const updatedBooking = await Booking.findOneAndUpdate(
//     { _id },
//     { $set: { bookingStatus } }, // Set the new bookingStatus
//     { new: true } // Return the updated document
//   );

//   return updatedBooking;
// };

// const getApprovedBooking = async () => {
//   const result = await Booking.find({ bookingStatus: "Approved" })
//     .populate({
//       path: "user",
//     })
//     .populate({
//       path: "car",
//     });
//   return result;
// };

// export const BookingServices = {
//   createBooking,
//   getUserBookings,
//   returnCar,
//   getAllBookings,
//   changeBookingStatus,
//   getApprovedBooking,
//   getUserApprovedBookings,
// };
