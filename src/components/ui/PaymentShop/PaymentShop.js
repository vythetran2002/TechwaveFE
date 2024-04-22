import React from "react";
import PaymentItem from "../PaymentItem/PaymentItem";
import Styles from "./styles.module.css";
import { Divider } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Button } from "antd";

function PaymentShop(props) {
  const { items, handleOpen } = props;

  if (items)
    return (
      <div className={Styles["shop-card-container"]}>
        <div className={Styles["shop-card-title"]}>
          <ShopOutlined style={{ fontSize: "20px" }} />
          {/* <span>v7men</span> */}
        </div>

        {items.length != 0 ? (
          items.map((item, index) => {
            return (
              <React.Fragment key={("index", index)}>
                <PaymentItem item={item} />
              </React.Fragment>
            );
          })
        ) : (
          <>EMPTY</>
        )}
        <div className={Styles["shop-voucher-container"]}>
          <div className={Styles["techwave-voucher-label-container"]}>
            <LocalActivityOutlinedIcon />
            <span>Shop Voucher: </span>
          </div>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              handleOpen();
            }}
          >
            Áp dụng
          </Button>
        </div>
      </div>
    );
}

export default PaymentShop;
