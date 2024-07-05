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
import UserLoadingUI from "@/components/ui/UserLoadingUI/UserLoadingUI";
import UserErrorUI from "@/components/ui/UserErrorUI/UserErrorUI";
function HeaderNav(props) {
  const data = useFetch(process.env.NEXT_PUBLIC_API_URL + "/api/category");

  return (
    <>
      <section className={Styles["nav-container"]}>
        <div className={Styles["list-section-container"]}>
          <div className={Styles["cate-list-container"]}>
            <div className={Styles["nav-cate-extend-container"]}>
              {data.isLoading ? (
                <UserLoadingUI />
              ) : data.isError ? (
                <UserErrorUI />
              ) : (
                <>
                  <NavCate
                    data={data.data}
                    isError={data.isError}
                    isLoading={data.isLoading}
                  />
                </>
              )}
            </div>
            <FormatListBulletedOutlinedIcon />
            <span>Danh mục sản phẩm</span>
          </div>
          <Link href={"/"} className={Styles["nav-item-container"]}>
            <HomeOutlinedIcon style={{ color: "white !important" }} />
            <span>Trang chủ</span>
          </Link>
          <Link href={"/contact"} className={Styles["nav-item-container"]}>
            <InfoOutlinedIcon />
            <span>Giới thiệu</span>
          </Link>
          {/* <div className={Styles["nav-item-container"]}>
            <CustomerServiceOutlined />
            <span>Dịch vụ</span>
          </div> */}
          {props.isHomePage ? (
            <div
              className={Styles["nav-item-container"]}
              onClick={() => {
                props.handleScrollToTrending();
              }}
            >
              <SpeakerGroupOutlinedIcon />
              <span>Sản phẩm bán chạy</span>
            </div>
          ) : (
            <Link
              href={"/?nav=trending"}
              className={Styles["nav-item-container"]}
              // onClick={() => {
              //   props.handleScrollToTrending();
              // }}
            >
              <SpeakerGroupOutlinedIcon />
              <span>Sản phẩm bán chạy</span>
            </Link>
          )}

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
