import React from "react";
import Styles from "./styles.module.css";
import { Empty, Typography } from "antd";

function UserErrorUI() {
  return (
    <div className={Styles["ui-container"]}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<Typography.Text>Failed to load data</Typography.Text>}
      />
    </div>
  );
}

export default UserErrorUI;
