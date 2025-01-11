import { v4 as uuidv4 } from "uuid";

// Function to calculate total cost
export function calculateTotalCost(
  startTime: string,
  endTime: string,
  pricePerHour: number
): number {
  // Convert startTime and endTime to Date objects
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Calculate start and end time in minutes
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  // Calculate the difference in minutes
  const durationInMinutes = endInMinutes - startInMinutes;

  // Convert the duration from minutes to hours
  const durationInHours = durationInMinutes / 60;

  // Calculate total cost
  const totalCost = durationInHours * pricePerHour;

  return totalCost;
}

export function generateTransactionId() {
  const timestamp = Date.now().toString(); // Current timestamp
  const randomString = Math.random().toString(36).substring(2, 10); // Random alphanumeric string

  const transactionId = `TXN-${timestamp}-${randomString}-${uuidv4()}`;
  return transactionId;
}

// Example usage

