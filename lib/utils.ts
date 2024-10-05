import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: string | Date): string => {
  const now = new Date();

  // Convert string to Date if necessary
  const createdAtDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  // Validate that the date is valid
  if (isNaN(createdAtDate.getTime())) {
    throw new Error("Invalid createdAt date");
  }

  const seconds = Math.floor((now.getTime() - createdAtDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) {
    return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
  }

  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) {
    return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
  }

  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) {
    return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) {
    return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) {
    return interval === 1
      ? `${interval} minute ago`
      : `${interval} minutes ago`;
  }

  return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
