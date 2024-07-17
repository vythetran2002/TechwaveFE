import React from "react";
import Styles from "../styles.module.css";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import Image from "next/image";
import { Divider, Tooltip } from "antd";
import images from "@/assets/images";
import { Image as AntImage } from "antd";
import Link from "next/link";

function ChildItem(props) {
  const { data } = props;

  // console.log("data", data);

  return (
    <>
      <div className={Styles["item-card-container"]}>
        <div className={Styles["item-left-container"]}>
          <div className={Styles["item-img-container"]}>
            {data.cart.option?.image ? (
              <>
                <AntImage
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
                    <AntImage
                      className={Styles.image}
                      width={80}
                      height={80}
                      src={data.cart.product?.image}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <AntImage
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
              <Link
                href={
                  "/product/" + data.cart.product?.product_id + "?nav=danhGia"
                }
                className={Styles.name}
              >
                {data.cart.product?.name}
              </Link>
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
          {data.price_desc ? (
            <div className={Styles["price-container"]}>
              <span className={Styles.promoPrice}>
                {FormatPrice(data.price)}
              </span>
              <span className={Styles.price}>
                {FormatPrice(data.price_desc)}
              </span>
            </div>
          ) : (
            <div className={Styles["price-container"]}>
              {/* <span className={Styles.promoPrice}>{FormatPrice(198000)}</span> */}
              <span className={Styles.price}>{FormatPrice(data.price)}</span>
            </div>
          )}
        </div>
      </div>
      <Divider />
    </>
  );
}

export default ChildItem;
