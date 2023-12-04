import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import { useRef } from "react";
import images from "@/assets/images";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Link from "next/link";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function VendorSidebar(props) {
  const route = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const handlingLogout = async () => {
    await removeCookie("token");
    route.push("/auth/login");
    toast.success("logged out");
  };

  const navRef = useRef();
  const navTitleRef = useRef();
  const navImgRef = useRef();
  const navToogleBtn = useRef();
  const searchRef = useRef();
  const homeRef = useRef();
  const profileRef = useRef();
  const userRef = useRef();
  const postRef = useRef();
  const reportRef = useRef();
  const storeRef = useRef();
  const perminssionRef = useRef();
  const logOutRef = useRef();

  const handlingCloseNav = () => {
    navRef.current.classList.toggle(Styles.close);
    navToogleBtn.current.classList.toggle(Styles.rotate180);
    navTitleRef.current.classList.toggle(Styles.disappear);
    navImgRef.current.classList.toggle(Styles.minimize);
    homeRef.current.classList.toggle(Styles.disappear);
    searchRef.current.classList.toggle(Styles.disappear);
    userRef.current.classList.toggle(Styles.disappear);
    postRef.current.classList.toggle(Styles.disappear);
    reportRef.current.classList.toggle(Styles.disappear);
    storeRef.current.classList.toggle(Styles.disappear);
    logOutRef.current.classList.toggle(Styles.disappear);
    profileRef.current.classList.toggle(Styles.disappear);
  };

  return (
    <>
      <div className={Styles["side-bar-container"]} ref={navRef}>
        <div className={Styles["side-bar-wrapper"]}>
          <div className={Styles["nav-img-container"]}>
            <Image
              src={images.techwave}
              alt=""
              priority={true}
              className={Styles["nav-img"]}
              ref={navImgRef}
            />
            <span
              className={Styles["extend-btn-wrapper"]}
              onClick={handlingCloseNav}
              ref={navToogleBtn}
            >
              <ChevronLeftIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            </span>
            <div className={Styles["sidebar-title-wrapper"]} ref={navTitleRef}>
              <span className={Styles["sidebar-title"]}>TECHWAVE</span>
              <span className={Styles["sidebar-sub-title"]}>VENDOR</span>
            </div>
          </div>
          <div className={Styles["nav-menu-container"]}>
            <div className={Styles["search-box"]}>
              <div className={Styles["item-wrapper"]}>
                <div className={Styles["search-icon-wrapper"]}>
                  <SearchOutlinedIcon />
                </div>
                <input
                  ref={searchRef}
                  placeholder="...Search"
                  className={Styles["search-input-wrapper"]}
                ></input>
              </div>
            </div>
            {props.path === "/home" ? (
              <Link
                href={"/vendor/home"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <HomeOutlinedIcon />
                </div>
                <span ref={homeRef} className={Styles["nav-title"]}>
                  Trang chủ
                </span>
              </Link>
            ) : (
              <Link href={"/vendor/home"} className={`${Styles["nav-link"]}`}>
                <div className={Styles["nav-icon"]}>
                  <HomeOutlinedIcon />
                </div>
                <span ref={homeRef} className={Styles["nav-title"]}>
                  Trang chủ
                </span>
              </Link>
            )}

            {props.path === "/profile" ? (
              <Link
                href={"/vendor/profile"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <AccountCircleOutlinedIcon />
                </div>
                <span ref={profileRef} className={Styles["nav-title"]}>
                  Tài khoản của tôi
                </span>
              </Link>
            ) : (
              <Link href={"/vendor/profile"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <AccountCircleOutlinedIcon />
                </div>
                <span ref={profileRef} className={Styles["nav-title"]}>
                  Tài khoản của tôi
                </span>
              </Link>
            )}

            {props.path === "/product" ? (
              <Link
                href={"/vendor/product"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <Inventory2OutlinedIcon />
                </div>
                <span ref={userRef} className={Styles["nav-title"]}>
                  Quản lý Sản phẩm
                </span>
              </Link>
            ) : (
              <Link href={"/vendor/product"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <Inventory2OutlinedIcon />
                </div>
                <span ref={userRef} className={Styles["nav-title"]}>
                  Quản lý Sản phẩm
                </span>
              </Link>
            )}

            {props.path === "/order" ? (
              <Link
                href={"/vendor/pendingorder"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <BorderAllOutlinedIcon />
                </div>
                <span ref={postRef} className={Styles["nav-title"]}>
                  Quản lý Đơn hàng
                </span>
              </Link>
            ) : (
              <Link
                href={"/vendor/pendingorder"}
                className={Styles["nav-link"]}
              >
                <div className={Styles["nav-icon"]}>
                  <BorderAllOutlinedIcon />
                </div>
                <span ref={postRef} className={Styles["nav-title"]}>
                  Quản lý Đơn hàng
                </span>
              </Link>
            )}

            {props.path === "/report" ? (
              <Link
                href={"/vendor/report"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <FlagOutlinedIcon />
                </div>
                <span ref={reportRef}>Quản lý báo cáo</span>
              </Link>
            ) : (
              <Link href={"/vendor/report"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <FlagOutlinedIcon />
                </div>
                <span ref={reportRef}>Quản lý báo cáo</span>
              </Link>
            )}

            {props.path === "/comment" ? (
              <Link
                href={"/vendor/comment"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <MarkChatUnreadOutlinedIcon />
                </div>
                <span ref={storeRef} className={Styles["nav-title"]}>
                  Quản lý Đánh giá
                </span>
              </Link>
            ) : (
              <Link href={"/vendor/comment"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <MarkChatUnreadOutlinedIcon />
                </div>
                <span ref={storeRef} className={Styles["nav-title"]}>
                  Quản lý Đánh giá
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className={Styles["log-out-wrapper"]}>
          <div
            className={Styles["log-out-link"]}
            style={{ cursor: "pointer" }}
            onClick={handlingLogout}
          >
            <div className={Styles["nav-icon"]}>
              <LogoutOutlinedIcon />
            </div>
            <span ref={logOutRef} className="transt-all-ease">
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorSidebar;
