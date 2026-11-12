import type { Metadata } from "next";
import "@/src/styles/globals.css";

export const metadata: Metadata = {
  title: "Haven & Gable | Better Living, Inside & Out",
  description:
    "Practical guides, thoughtful inspiration, and smarter buying advice for your home, garden, and everything outdoors.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
