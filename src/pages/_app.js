import React from "react";
import "../styles/global.css";
import { Roboto } from "next/font/google";
import { Inter } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
