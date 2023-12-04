import React from "react";
import Styles from "./styles.module.css";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpeakerGroupOutlinedIcon from "@mui/icons-material/SpeakerGroupOutlined";
import NavCate from "@/components/ui/Slider/NavCate/NavCate";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

import { memo } from "react";

function HeaderNav() {
  return (
    <>
      <section className={Styles["nav-container"]}>
        <div className={Styles["list-section-container"]}>
          <div className={Styles["cate-list-container"]}>
            <div className={Styles["nav-cate-extend-container"]}>
              <NavCate />
            </div>
            <FormatListBulletedOutlinedIcon />
            <span>Danh mục sản phẩm</span>
          </div>
          <div className={Styles["nav-item-container"]}>
            <HomeOutlinedIcon style={{ color: "white !important" }} />
            <span>Trang chủ</span>
          </div>
          <div className={Styles["nav-item-container"]}>
            <InfoOutlinedIcon />
            <span>Giới thiệu</span>
          </div>
          {/* <div className={Styles["nav-item-container"]}>
            <CustomerServiceOutlined />
            <span>Dịch vụ</span>
          </div> */}
          <div className={Styles["nav-item-container"]}>
            <SpeakerGroupOutlinedIcon />
            <span>Sản phẩm bán chạy</span>
          </div>
          <div className={Styles["nav-item-container"]}>
            <NewspaperOutlinedIcon />
            <span>Tin tức</span>
          </div>
          <div className={Styles["nav-item-container"]}>
            <CallOutlinedIcon />
            <span>Liên hệ</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(HeaderNav);
