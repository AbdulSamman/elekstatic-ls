import type { Metadata } from "next";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/site.scss";
import Footer from "./_components/Footer";
import { AppProvider } from "./AppContext";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "SnB audio",
//   description: "HiFi Audiotechnik von SAMMAN & BOFFO",
//   icons: {
//     icon: "/logo.png",
//     shortcut: "/logo.png",
//     apple: "/logo.png",
//   },
// };
export const metadata: Metadata = {
  title: "SnB audio",
  description: "HiFi Audiotechnik von SAMMAN & BOFFO",

  metadataBase: new URL("https://snbaudio.de"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SnB audio",
    description: "HiFi Audiotechnik von SAMMAN & BOFFO",
    url: "https://snbaudio.de",
    siteName: "SnB audio",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "SnB audio Logo",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "SIGN IN",
            subtitle: "Welcome to SnB audio",
          },
        },
        signUp: {
          start: {
            title: "SIGN UP",
            subtitle: "Welcome to SnB audio",
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProvider>
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
