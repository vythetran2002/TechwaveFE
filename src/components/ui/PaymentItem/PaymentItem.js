import React from "react";
import Styles from "./style.module.css";
import images from "@/assets/images";
import Image from "next/image";
import { FormatPrice } from "@/assets/utils/PriceFormat";

function PaymentItem(props) {
  const { item } = props;
  // console.log(item);

  return (
    <>
      <div className={Styles["payment-item-container"]}>
        <div className={Styles["name-img-container"]}>
          <div className={Styles["img-wrapper"]}>
            {item.option ? (
              item.option.image ? (
                <>
                  <Image
                    src={item.option.image}
                    alt=""
                    width={100}
                    height={100}
                    priority={true}
                    className={Styles["img"]}
                  />
                </>
              ) : (
                <>
                  <Image
                    width={100}
                    height={100}
                    src={images.image8}
                    alt=""
                    priority={true}
                    className={Styles["img"]}
                  />
                </>
              )
            ) : (
              <>
                {item.product.image ? (
                  <>
                    <Image
                      src={item.product.image}
                      alt=""
                      width={100}
                      height={100}
                      priority={true}
                      className={Styles["img"]}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      width={100}
                      height={100}
                      src={images.image8}
                      alt=""
                      priority={true}
                      className={Styles["img"]}
                    />
                  </>
                )}
              </>
            )}

            <span className={Styles["dot"]}>{item.quantity}</span>
          </div>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: "10px",
            }}
          >
            {/* {item.option ? <>{item.option.name}</> : <>{item.product.name}</>} */}
            <span className={Styles["name"]}>{item.product.name}</span>
            {item.option && (
              <>
                <span className={Styles.cate} style={{ fontSize: "13px" }}>
                  Phân loại: {item.option.name}
                </span>
              </>
            )}
          </span>
        </div>
        {item.product.promotional_price ? (
          <div className={Styles["price-container"]}>
            <span style={{ textDecoration: "line-through" }}>
              {FormatPrice(item.product.price)}
            </span>
            <div className={Styles["price-quantity-container"]}>
              <span>{FormatPrice(item.product.promotional_price)} </span>
              {props.isFailedItem ? (
                <span style={{ color: "red", fontWeight: "500" }}>
                  x {item.quantity}
                </span>
              ) : (
                <span>x {item.quantity}</span>
              )}
            </div>
          </div>
        ) : (
          <div className={Styles["price-container"]}>
            <span>
              {FormatPrice(item.product.price)} x {item.quantity}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentItem;
