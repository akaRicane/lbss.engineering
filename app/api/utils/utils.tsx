"use client";

export function getLocation() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}
