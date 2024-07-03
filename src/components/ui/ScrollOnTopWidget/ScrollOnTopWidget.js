import React from "react";
import Styles from "./styles.module.css";
import { UpOutlined } from "@ant-design/icons";

function ScrollOnTopWidget() {
  return (
    <div className={Styles.scrollToTop}>
      <svg
        className={Styles.scrollIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 4L4 12H7V20H17V12H20L12 4Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export default ScrollOnTopWidget;
