import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post("", auth(USER_ROLE.user), BookingControllers.createBooking);

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.getUserBookings
);

export const BookingRoutes = router;
