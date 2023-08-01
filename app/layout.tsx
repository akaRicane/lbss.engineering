import "./styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "engineering-client",
  description: "lbss.engineering client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
