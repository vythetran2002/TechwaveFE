import React from "react";
import Styles from "../styles.module.css";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import Image from "next/image";
import { Divider, Tooltip } from "antd";
import images from "@/assets/images";

function ChildItem(props) {
  const { data } = props;

  console.log(data);

  return (
    <>
      <div className={Styles["item-card-container"]}>
        <div className={Styles["item-left-container"]}>
          <div className={Styles["item-img-container"]}>
            {data.cart.option?.image ? (
              <>
                <Image
                  className={Styles.image}
                  width={80}
                  height={80}
                  src={data.cart.option?.image}
                  alt=""
                />
              </>
            ) : (
              <>
                {data.cart.product?.image ? (
                  <>
                    <Image
                      className={Styles.image}
                      width={80}
                      height={80}
                      src={data.cart.product?.image}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <Image
                      className={Styles.image}
                      width={80}
                      height={80}
                      src={images.nonImg}
                      alt=""
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div className={Styles["item-info-container"]}>
            <Tooltip title={data.cart.product?.name}>
              <span className={Styles.name}>{data.cart.product?.name}</span>
            </Tooltip>
            <div className={Styles["option-quantity-container"]}>
              {data.cart.option?.name && (
                <span className={Styles["option"]}>
                  Phân loại hàng: {data.cart.option?.name}
                </span>
              )}
              <span style={{ textAlign: "left" }}>x{data.cart.quantity}</span>
            </div>
          </div>
        </div>
        <div className={Styles["item-right-container"]}>
          <div className={Styles["price-container"]}>
            {/* <span className={Styles.promoPrice}>{FormatPrice(198000)}</span> */}
            <span className={Styles.price}>{FormatPrice(data.price)}</span>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default ChildItem;
