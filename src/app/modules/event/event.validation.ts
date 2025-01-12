import { z } from "zod";

const createEventZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    date: z.string().nonempty("Date is required"),
    location: z.string().nonempty("Location is required"),
    maxAttendees: z
      .number()
      .int("Max attendees must be an integer")
      .positive("Max attendees must be a positive number")
      .min(1, "There should be at least one attendee"),
  }),
});

export const EventValidation = {
  createEventZodSchema,
};
