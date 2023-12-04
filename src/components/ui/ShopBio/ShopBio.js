import React from "react";
import Styles from "./styles.module.css";
import Blog from "../TestBlog/Blog";

function ShopBio() {
  return (
    <>
      <div className={Styles["shop-bio-container"]}>
        <div className={Styles["shop-bio-wrapper"]}>
          <span className={Styles["bio-heading"]}>THÔNG TIN SHOP</span>
          <div className={Styles["bio-content"]}></div>
        </div>
      </div>
    </>
  );
}

export default ShopBio;
