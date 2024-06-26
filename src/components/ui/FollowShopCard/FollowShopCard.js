import React from "react";
import Styles from "./styles.module.css";
import { useRef } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { memo } from "react";
import { Button } from "antd";
import Link from "next/link";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
function FollowShopCard(props) {
  //Refs
  const linkRef = useRef(null);

  const handlingClickUnfollow = () => {
    props.onClickUnFollow(props.vendorId);
  };

  const handlingClickViewDetail = () => {
    linkRef.current.click();
  };

  return (
    <>
      <div className={Styles["purchase-item-container"]}>
        <div className={Styles["item-status-container"]}>
          <Button type="primary" danger onClick={handlingClickUnfollow}>
            Huỷ Follow
          </Button>
          <Button type="primary" onClick={handlingClickViewDetail}>
            Xem Shop
          </Button>
          {/* <div className={Styles["item-status-wrapper"]}>
            <span className={Styles["item-status-wrapper"]}>
              <MoreHorizOutlinedIcon />
            </span>
            <span style={{ marginLeft: "10px" }}>
              Báo cáo đang được phê duyệt
            </span>
          </div> */}
        </div>

        <div className={Styles["item-info-container"]}>
          <div className={Styles["img-name-container"]}>
            <Link
              href={"/shop/" + props.vendorId + "/0"}
              className={Styles["img-wrapper"]}
            >
              {props.avatar != null ? (
                <Image
                  width={70}
                  height={70}
                  src={props.avatar}
                  alt=""
                  priority={true}
                  className={Styles["img"]}
                />
              ) : (
                <Image
                  width={70}
                  height={70}
                  src={images.nonAvatar}
                  alt=""
                  priority={true}
                  className={Styles["img"]}
                />
              )}
            </Link>
            <div className={Styles["name-wrapper"]}>
              <Link
                href={"/shop/" + props.vendorId + "/0"}
                className={Styles["name-shop-link"]}
                ref={linkRef}
              >
                {props.name}
              </Link>
            </div>
          </div>
          <div className={Styles["price-container"]}></div>
        </div>
      </div>
    </>
  );
}

export default memo(FollowShopCard);
