// import express from "express";

// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.constant";
// import { BookingControllers } from "./booking.controller";
// import { BookingValidation } from "./booking.validation";
// import validateRequest from "../../middlewares/validateRequest";

// const router = express.Router();

// router.post(
//   "",

//   auth(USER_ROLE.user),
//   validateRequest(BookingValidation.createBookingValidationSchema),
//   BookingControllers.createBooking
// );
// router.get(
//   "",

//   auth(USER_ROLE.admin),
//   BookingControllers.getAllBookings
// );
// router.get(
//   "/my-bookings",

//   auth(USER_ROLE.user),
//   BookingControllers.getUserBookings
// );
// router.get(
//   "/my-approved-bookings",

//   auth(USER_ROLE.user),
//   BookingControllers.getUserApprovedBookings
// );

// router.get(
//   "/get-approved-bookings",
//   auth(USER_ROLE.admin),
//   BookingControllers.getApprovedBookings
// );
// router.put(
//   "/change-status/:id",
//   auth(USER_ROLE.admin),
//   BookingControllers.changeBookingStatus
// );

// export const BookingRoutes = router;
