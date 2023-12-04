import Header from "../global/Header/Header";
import Footer from "../global/Footer/Footer";

import React from "react";
import HeaderNav from "../global/Header/HeaderNav";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
