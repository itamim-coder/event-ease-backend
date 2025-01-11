import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    car: z.string(),
    date: z.string(),
    startTime: z.string(),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
