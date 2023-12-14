import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import Link from "next/link";

function SearchItemCard(props) {
  const { item } = props;
  return (
    <>
      <Link
        href={"product/" + item.product_id}
        className={Styles["card-container"]}
      >
        {item.image != null ? (
          <Image
            style={{ borderRadius: "5px" }}
            src={item.image}
            alt=""
            width={50}
            height={50}
          />
        ) : (
          <Image
            style={{ borderRadius: "5px" }}
            src={images.nonImg}
            alt=""
            width={50}
            height={50}
          />
        )}
        <div className={Styles["card-info-container"]}>
          <span>{item.name}</span>
          {item.promotional_price ? (
            <div className={Styles["price-container"]}>
              <span className={Styles["promo-price"]}>
                {FormatPrice(item.promotional_price)}
              </span>
              <span className={Styles["price"]}>{FormatPrice(item.price)}</span>
            </div>
          ) : (
            <div className={Styles["price-container"]}>
              <span className={Styles["promo-price"]}>
                {FormatPrice(item.price)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </>
  );
}

export default SearchItemCard;
