import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import { memo } from "react";

function AdBar(props) {
  return (
    <>
      <section className={Styles["adbar-container"]}>
        <div className={Styles["adbar-wrapper"]}>
          <Image src={props.src} alt="" className="banner" />
        </div>
      </section>
    </>
  );
}

export default memo(AdBar);
