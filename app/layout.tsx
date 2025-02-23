import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS-Dooble",
  description: "Open cases and win amazing skins!",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
