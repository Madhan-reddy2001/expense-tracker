import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodDash - Fresh Food Delivered Fast",
  description:
    "Order delicious meals from the best restaurants near you. Fast delivery, great prices, and amazing flavors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <CartProvider>
          <SearchProvider>
            <Header />
            <CartDrawer />
            <main>{children}</main>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
