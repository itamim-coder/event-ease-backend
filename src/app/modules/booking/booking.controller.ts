// /* eslint-disable @typescript-eslint/no-explicit-any */
// import catchAsync from "../../shared/catchAsync";
// import sendResponse from "../../shared/sendResponse";
// import { BookingServices } from "./booking.service";
// import { TBooking } from "./booking.interface";
// import httpStatus from "http-status";

// const createBooking = catchAsync(async (req: any, res) => {
//   const { userId } = req.user;
//   //   console.log("booking", req.user);
//   const { ...bookingData } = req.body;
//   console.log(req.body);
//   const result = await BookingServices.createBooking(userId, bookingData);
//   sendResponse<TBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Car Booked successfully!",
//     data: result,
//   });
// });

// const getUserBookings = catchAsync(async (req: any, res) => {
//   const { userId } = req.user;

//   if (userId) {
//     const result = await BookingServices.getUserBookings(userId);

//     if (result.length > 0) {
//       sendResponse<TBooking[]>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "My Bookings retrieved successfully",

//         data: result,
//       });
//     } else {
//       sendResponse(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: "No Data found!",
//         data: [],
//       });
//     }
//   }
// });
// const getUserApprovedBookings = catchAsync(async (req: any, res) => {
//   const { userId } = req.user;

//   if (userId) {
//     const result = await BookingServices.getUserApprovedBookings(userId);

//     if (result.length > 0) {
//       sendResponse<TBooking[]>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "My Bookings retrieved successfully",

//         data: result,
//       });
//     } else {
//       sendResponse(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: "No Data found!",
//         data: [],
//       });
//     }
//   }
// });

// const returnCar = catchAsync(async (req, res) => {
//   const returnData = req.body;
//   console.log(req.body);
//   const result = await BookingServices.returnCar(returnData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Car returned successfully",
//     data: result,
//   });
// });

// const getAllBookings = catchAsync(async (req, res) => {
//   const result = await BookingServices.getAllBookings(req.query);
//   if (result.length > 0) {
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "All Bookings are retrieved successfully",

//       data: result,
//     });
//   } else {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: "No Data found!",
//       data: [],
//     });
//   }
// });

// const changeBookingStatus = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const bookingStatus = req.body;
//   console.log(bookingStatus);
//   const result = await BookingServices.changeBookingStatus(id, bookingStatus);

//   sendResponse<TBooking>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Status updated successfully !",
//     data: result,
//   });
// });

// const getApprovedBookings = catchAsync(async (req: any, res) => {
//   const result = await BookingServices.getApprovedBooking();

//   if (result.length > 0) {
//     sendResponse<TBooking[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Approved Bookings retrieved successfully",

//       data: result,
//     });
//   } else {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: "No Data found!",
//       data: [],
//     });
//   }
// });

// export const BookingControllers = {
//   createBooking,
//   getUserBookings,
//   returnCar,
//   getAllBookings,
//   changeBookingStatus,
//   getApprovedBookings,
//   getUserApprovedBookings,
// };
