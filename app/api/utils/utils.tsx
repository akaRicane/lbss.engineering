"use client";

export function getLocation(): string {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}
