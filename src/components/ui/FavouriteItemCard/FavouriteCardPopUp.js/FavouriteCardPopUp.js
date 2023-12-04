import React from "react";
import Styles from "./styles.module.css";
import dynamic from "next/dynamic";
const Checkbox = dynamic(() => import("antd/es/checkbox/Checkbox"), {
  ssr: false,
});
function FavouriteCardPopUp(props) {
  return (
    <>
      <div className={Styles["card-pop-up-container"]}>
        <div className={Styles["checkbox-quantity-container"]}>
          <span className="flex03 center">
            <Checkbox checked={props.checked} onChange={props.handlingChange} />
          </span>
          <span className="flex1 center">Chọn tất cả (7)</span>
        </div>
        <div className={Styles["purchase-container"]}>
          <span>Tổng thanh toán (0 Sản phẩm)</span>
          <span>699.000 đ</span>
          <button className={Styles["purchase-btn"]}>Mua hàng</button>
        </div>
      </div>
    </>
  );
}

export default FavouriteCardPopUp;
