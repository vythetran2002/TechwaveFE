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
import Link from "next/link";
import useFetch from "@/api/useFetch";

function HeaderNav() {
  const data = useFetch("http://localhost:3000/api/category");

  if (data.isLoading) {
    return <>Loading</>;
  }
  if (data.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <section className={Styles["nav-container"]}>
          <div className={Styles["list-section-container"]}>
            <div className={Styles["cate-list-container"]}>
              <div className={Styles["nav-cate-extend-container"]}>
                <NavCate
                  data={data.data}
                  isError={data.isError}
                  isLoading={data.isLoading}
                />
              </div>
              <FormatListBulletedOutlinedIcon />
              <span>Danh mục sản phẩm</span>
            </div>
            <Link href={"/"} className={Styles["nav-item-container"]}>
              <HomeOutlinedIcon style={{ color: "white !important" }} />
              <span>Trang chủ</span>
            </Link>
            <div className={Styles["nav-item-container"]}>
              <InfoOutlinedIcon />
              <span>Giới thiệu</span>
            </div>
            {/* <div className={Styles["nav-item-container"]}>
            <CustomerServiceOutlined />
            <span>Dịch vụ</span>
          </div> */}
            <Link href={"/cate/2"} className={Styles["nav-item-container"]}>
              <SpeakerGroupOutlinedIcon />
              <span>Sản phẩm bán chạy</span>
            </Link>
            {/* <div className={Styles["nav-item-container"]}>
            <NewspaperOutlinedIcon />
            <span>Tin tức</span>
          </div> */}
            <Link href={"/contact"} className={Styles["nav-item-container"]}>
              <CallOutlinedIcon />
              <span>Liên hệ</span>
            </Link>
          </div>
        </section>
      </>
    );
}

export default memo(HeaderNav);
