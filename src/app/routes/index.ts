import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

import { UserRoutes } from "../modules/user/user.route";
import { EventRoutes } from "../modules/event/event.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/event",
    route: EventRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
