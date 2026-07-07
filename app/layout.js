import "./globals.css";
import React from "react";

export const metadata = {
  title: "RootVenture",
  description: "A platform to share startup ideas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
  

