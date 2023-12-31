import Header from "../global/Header/Header";
import Footer from "../global/Footer/Footer";
import React from "react";
import HeaderNav from "../global/Header/HeaderNav";
import Styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={Styles["main"]}>
      <Header />
      <HeaderNav />
      <main className={Styles["body"]}>{children}</main>
      <Footer className={Styles["footer"]} />
    </div>
  );
}
