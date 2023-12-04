import React from "react";
import Styles from "./style.module.css";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { memo } from "react";
function Footer() {
  return (
    <>
      <div className={Styles["footer-container"]}>
        <div className={Styles["email-input-container"]}>
          <div className={Styles["email-title-container"]}>
            <EmailRoundedIcon className={Styles["icon"]} />
            <span>Email nhận khuyến mãi: </span>
          </div>
          <div className={Styles["email-input-wrapper"]}>
            <form className={Styles["input-button-container"]}>
              <input
                className={Styles["email-input"]}
                placeholder="Hãy nhập địa chỉ email của bạn"
              ></input>
              <button className={Styles["send-button"]}>
                <SendRoundedIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={Styles["store-info-container"]}>
        <div className={Styles["store-info-wrapper"]}>
          <div className={Styles["row"]}>
            <div className={Styles["col"]}>
              <div className={Styles["row"]}>
                <span>THÔNG TIN CÔNG TY - CỬA HÀNG</span>
              </div>
              <div className={Styles["row"]}>
                <span>
                  Địa chỉ: 473/8B Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình
                  Tân, Thành phố Hồ Chí Minh
                </span>
              </div>
              <div className={Styles["row"]}>
                <span>Hỗ trợ kỹ thuật: (028) 36 36 1080 - Ext: 104 - 105</span>
              </div>
              <div className={Styles["row"]}>
                <span>Email: info@webso.vn / webso.vn@gmail.com</span>
              </div>
              <div className={Styles["row"]}>
                <span>Mã số thuế: 0311177962</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles["more-info-container"]}></div>
    </>
  );
}

export default memo(Footer);
