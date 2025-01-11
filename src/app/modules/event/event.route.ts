import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { EventValidation } from "./event.validation";
import { EventController } from "./event.controller";

const router = express.Router();

router.post(
  "",

  validateRequest(EventValidation.createEventZodSchema),
  EventController.createEvent
);

router.get("", EventController.getAllEvents);

router.get("/:id", EventController.getSingleEvent);

router.put("/:id", EventController.updateEvent);

// router.delete(
//   "/:id",
//   auth(USER_ROLE.admin),
//   EventController.softDeleteEvent
// );

export const EventRoutes = router;
