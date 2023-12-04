import React from "react";
import Styles from "./styles.module.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
const sxStyle = {
  width: "50px",
  height: "60px",
};

function ServiceList() {
  return (
    <>
      <div className={Styles["service-list-wrapper"]}>
        <div className={Styles["service-list-container"]}>
          <div className={Styles["service-item-container"]}>
            <LocalShippingOutlinedIcon
              sx={sxStyle}
              className={Styles["service-item-icon"]}
            />
            <span className={Styles["service-item-title"]}>Miễn phí ship</span>
            <span className={Styles["service-item-desc"]}>
              Cho đơn hàng trên 1 triệu
            </span>
          </div>
          <div className={Styles["service-item-container"]}>
            <PersonOutlineOutlinedIcon
              sx={sxStyle}
              className={Styles["service-item-icon"]}
            />
            <span className={Styles["service-item-title"]}>
              Tư vấn miễn phí
            </span>
            <span className={Styles["service-item-desc"]}>
              Không mua không sao
            </span>
          </div>
          <div className={Styles["service-item-container"]}>
            <RedeemOutlinedIcon
              sx={sxStyle}
              className={Styles["service-item-icon"]}
            />
            <span className={Styles["service-item-title"]}>Tri ân</span>
            <span className={Styles["service-item-desc"]}>
              Rất nhiều ưu đãi và quà tặng
            </span>
          </div>
          <div className={Styles["service-item-container"]}>
            <HeadsetMicOutlinedIcon
              sx={sxStyle}
              className={Styles["service-item-icon"]}
            />
            <span className={Styles["service-item-title"]}>
              {" "}
              24/7 hỗ trợ online
            </span>
            <span className={Styles["service-item-desc"]}>
              Luôn có nhân viên hỗ trợ
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceList;
