import React from "react";
import { memo } from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets/images";
import StorefrontIcon from "@mui/icons-material/Storefront";

function ShopDetailCard(props) {
  const product = props.product;

  return (
    <>
      <div className={Styles["shop-card-container"]}>
        {product && (
          <div className={Styles["shop-card-wrapper"]}>
            <div className={Styles["shop-avatar-name-container"]}>
              {product.store.info.picture != null ? (
                <Link
                  href={"/shop/" + product.store.info.account_id + "/0"}
                  className={Styles["shop-avatar-container"]}
                >
                  <Image
                    width={50}
                    height={50}
                    src={product.store.info.picture}
                    className={Styles["shop-avatar"]}
                    alt=""
                  />
                </Link>
              ) : (
                <Link
                  href={"/shop/" + product.store.info.account_id + "/0"}
                  className={Styles["shop-avatar-container"]}
                >
                  <Image
                    width={50}
                    height={50}
                    src={images.nonAvatar}
                    className={Styles["shop-avatar"]}
                    alt=""
                  />
                </Link>
              )}

              <div className={Styles["shop-name-container"]}>
                <span className={Styles["shop-name"]}>
                  {product.store.info.username}
                </span>
                <Link
                  href={"/shop/" + product.store.info.account_id + "/0"}
                  className={Styles["shop-forward-button"]}
                >
                  <StorefrontIcon />
                  <span>Xem shop</span>
                </Link>
              </div>
            </div>
            <div className={Styles["shop-info-container"]}>
              <div className={Styles["shop-info-item"]}>
                <span className={Styles["shop-info-item-title"]}>Đánh giá</span>
                <span>{product.store.review}</span>
              </div>
              <div className={Styles["shop-info-item"]}>
                <span className={Styles["shop-info-item-title"]}>Sản phẩm</span>
                <span>{product.store.product}</span>
              </div>
              <div className={Styles["shop-info-item"]}>
                <span className={Styles["shop-info-item-title"]}>Tham gia</span>
                <span>{product.store.join}</span>
              </div>
              <div className={Styles["shop-info-item"]}>
                <span className={Styles["shop-info-item-title"]}>
                  Số lượt theo dõi
                </span>
                <span>{product.store.followers}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(ShopDetailCard);
