import express from "express";
import validateRequest from "../../middlewares/validateRequest";

// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.constant";
import { EventValidation } from "./event.validation";
import { EventController } from "./event.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "",
  auth(USER_ROLE.user),
  validateRequest(EventValidation.createEventZodSchema),
  EventController.createEvent
);

router.get("", EventController.getAllEvents);

router.get("/:id", EventController.getSingleEvent);

router.put("/:id", EventController.updateEvent);

router.delete("/:id", EventController.deleteEvent);

export const EventRoutes = router;
