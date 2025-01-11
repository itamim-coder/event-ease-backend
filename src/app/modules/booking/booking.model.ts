import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: Date,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      default: null,
      unique: true,
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Validate 24hr time format
        },
        message: "Invalid startTime format. Expected format HH:mm",
      },
    },
    endTime: {
      type: String,
      default: null,
      validate: {
        validator: function (value: string | undefined) {
          // Allow endTime to be optional, validate if provided
          if (value === undefined || value === null) return true;
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Validate 24hr time format
        },
        message: "Invalid endTime format. Expected format HH:mm",
      },
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export the Mongoose model for the Booking schema
export const Booking = model<TBooking>("Booking", bookingSchema);
