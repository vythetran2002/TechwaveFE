import React from "react";
import Styles from "./style.module.css";
import images from "@/assets/images";
import Image from "next/image";

function PaymentItem(props) {
  const { item } = props;
  console.log(item);

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
          <span>
            {item.option ? <>{item.option.name}</> : <>{item.product.name}</>}
          </span>
        </div>
        <span className={Styles["price-container"]}>
          {item.price}đ x {item.quantity}
        </span>
      </div>
    </>
  );
}

export default PaymentItem;
