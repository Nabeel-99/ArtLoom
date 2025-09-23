import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const artImages = [
  "/art1.png",
  "/art2.png",
  "/art3.png",
  "/art4.png",
  "/art5.png",
  "/art6.png",
  "/art7.png",
  "/art8.png",
  "/art9.png",
  "/art10.png",
  "/art11.png",
  "/art12.png",
];
