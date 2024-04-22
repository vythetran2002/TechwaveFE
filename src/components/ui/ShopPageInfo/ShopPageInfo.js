import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import images from "@/assets/images";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { memo } from "react";
import { Tooltip } from "antd";
import { useState } from "react";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

function ShopPageInfo(props) {
  const [store, setStore] = useState(props.store);

  // console.log(store);

  const handlingAddFavourite = async () => {
    await props.addFavourite(store.info.info.account_id);
    await props.mutate();
  };

  const handlingRemoveFollow = async () => {
    await props.removeFollow(store.info.info.account_id);
    await props.mutate();
  };

  const handleOpenDialog = () => {
    props.handleOpenDialog();
  };

  useEffect(() => {
    // console.log("aaaaa");
    setStore(props.store);
  }, [props.store, props.count]);

  return (
    <>
      {store && (
        <div className={Styles["shop-info-container"]}>
          <div className={Styles["shop-info-wrapper"]}>
            <div className={Styles["shop-info-card-container"]}>
              <div className={Styles["shop-avatar-name-container"]}>
                <div className={Styles["shop-avatar-wrapper"]}>
                  {store.info.info.picture ? (
                    <>
                      <Image
                        width={50}
                        height={50}
                        src={store.info.info.picture}
                        alt=""
                        className={Styles["shop-avatar"]}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        width={50}
                        height={50}
                        src={images.nonAvatar}
                        alt=""
                        className={Styles["shop-avatar"]}
                      />
                    </>
                  )}
                </div>
                <span className={Styles["shop-name"]}>
                  {store.info.info.username}
                </span>
              </div>
              {store.info.status ? (
                <Tooltip title="Nhấn để huỷ theo dõi">
                  <button
                    className={Styles["shop-unfollow-button"]}
                    onClick={handlingRemoveFollow}
                  >
                    Đã theo dõi
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Nhấn để theo dõi">
                  <button
                    className={Styles["shop-follow-button"]}
                    onClick={handlingAddFavourite}
                  >
                    Theo dõi
                  </button>
                </Tooltip>
              )}
            </div>
            <div className={Styles["shop-overview-container"]}>
              <div className={Styles["shop-overview-item"]}>
                <div className={Styles["icon-tile-wrapper"]}>
                  <StorefrontIcon />
                  <span>Sản phẩm:</span>
                </div>
                <span style={{ color: "var(--header-bg-top)" }}>
                  {store.info.product}
                </span>
              </div>
              <div className={Styles["shop-overview-item"]}>
                <div className={Styles["icon-tile-wrapper"]}>
                  <StarBorderOutlinedIcon />
                  <span>Đánh giá:</span>
                </div>
                <span style={{ color: "var(--header-bg-top)" }}>
                  4.6 ({store.info.review} Đánh giá)
                </span>
              </div>
              <div className={Styles["shop-overview-item"]}>
                <div className={Styles["icon-tile-wrapper"]}>
                  <PersonOutlineOutlinedIcon />
                  <span>Người theo dõi:</span>
                </div>
                <span style={{ color: "var(--header-bg-top)" }}>
                  {store.info.followers}
                </span>
              </div>
              <div className={Styles["shop-overview-item"]}>
                <div className={Styles["icon-tile-wrapper"]}>
                  <AccessibilityNewOutlinedIcon />
                  <span>Tham gia:</span>
                </div>
                <span style={{ color: "var(--header-bg-top)" }}>
                  {store.info.join}
                </span>
              </div>
              <div
                className={Styles["report-container"]}
                onClick={handleOpenDialog}
              >
                <FlagOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopPageInfo;
