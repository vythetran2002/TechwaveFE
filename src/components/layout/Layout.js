import Header from "../global/Header/Header";
import Footer from "../global/Footer/Footer";
import React, { useEffect, useState } from "react";
import HeaderNav from "../global/Header/HeaderNav";
import Styles from "./styles.module.css";

export default function Layout({
  children,
  handleScrollToTrending,
  isHomePage,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`${Styles["main"]} userLayout`}>
      <Header />
      <HeaderNav
        handleScrollToTrending={handleScrollToTrending}
        isHomePage={isHomePage}
      />
      <main className={Styles["body"]}>{children}</main>
      <Footer className={Styles["footer"]} />
    </div>
  );
}
