import React from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import { memo } from "react";

function StoreImageHeading(props) {
  return (
    <>
      <section className={Styles["heading-wrapper"]}>
        <div className={Styles["heading-container"]}>
          <Link className={Styles["cate-heading"]} href={"/"}>
            {props.title}
          </Link>
        </div>
      </section>
    </>
  );
}

export default memo(StoreImageHeading);
