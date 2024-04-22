import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import { useRef } from "react";
import images from "@/assets/images";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/router";
// import { useCookies } from "react-cookie";
import { LogOutAccount } from "@/api/auth/LogOutAcount";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import Cookies from "js-cookie";

function AdminSidebar(props) {
  const route = useRouter();
  // const [cookies, removeCookie] = useCookies();
  const handlingLogout = async () => {
    const token = Cookies.get("token");
    const message = await LogOutAccount(token);
    await Cookies.remove("token");

    route.push("/auth/login");
    // toast.success("logged out");
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
    perminssionRef.current.classList.toggle(Styles.disappear);
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
              <span className={Styles["sidebar-sub-title"]}>ADMIN</span>
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
                href={"/admin/home"}
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
              <Link href={"/admin/home"} className={`${Styles["nav-link"]}`}>
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
                href={"/admin/profile"}
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
              <Link href={"/admin/profile"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <AccountCircleOutlinedIcon />
                </div>
                <span ref={profileRef} className={Styles["nav-title"]}>
                  Tài khoản của tôi
                </span>
              </Link>
            )}

            {props.path === "/account" ? (
              <Link
                href={"/admin/account/?status=1&page=1&limit=5"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <ManageAccountsOutlinedIcon />
                </div>
                <span ref={userRef} className={Styles["nav-title"]}>
                  Quản lý Users
                </span>
              </Link>
            ) : (
              <Link
                href={"/admin/account/?status=1&page=1&limit=5"}
                className={Styles["nav-link"]}
              >
                <div className={Styles["nav-icon"]}>
                  <ManageAccountsOutlinedIcon />
                </div>
                <span ref={userRef} className={Styles["nav-title"]}>
                  Quản lý Users
                </span>
              </Link>
            )}

            {props.path === "/cate" ? (
              <Link
                href={"/admin/cate"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <CategoryOutlinedIcon />
                </div>
                <span ref={postRef} className={Styles["nav-title"]}>
                  Quản lý danh mục
                </span>
              </Link>
            ) : (
              <Link href={"/admin/cate"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <CategoryOutlinedIcon />
                </div>
                <span ref={postRef} className={Styles["nav-title"]}>
                  Quản lý danh mục
                </span>
              </Link>
            )}

            {props.path === "/unresolvedreport" ? (
              <Link
                href={"/admin/unresolvedreport"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <FlagOutlinedIcon />
                </div>
                <span ref={reportRef}>Quản lý báo cáo</span>
              </Link>
            ) : (
              <Link
                href={"/admin/unresolvedreport"}
                className={Styles["nav-link"]}
              >
                <div className={Styles["nav-icon"]}>
                  <FlagOutlinedIcon />
                </div>
                <span ref={reportRef}>Quản lý báo cáo</span>
              </Link>
            )}

            {props.path === "/comment" ? (
              <Link
                href={"/admin/comment"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <QuestionAnswerOutlinedIcon />
                </div>
                <span ref={storeRef} className={Styles["nav-title"]}>
                  Quản lý đánh giá
                </span>
              </Link>
            ) : (
              <Link href={"/admin/comment"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <QuestionAnswerOutlinedIcon />
                </div>
                <span ref={storeRef} className={Styles["nav-title"]}>
                  Quản lý đánh giá
                </span>
              </Link>
            )}

            {props.path === "/vouchers" ? (
              <Link
                href={"/admin/vouchers"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <DiscountOutlinedIcon />
                </div>
                <span ref={perminssionRef} className={Styles["nav-title"]}>
                  Quản lý khuyến mãi
                </span>
              </Link>
            ) : (
              <Link href={"/admin/vouchers"} className={Styles["nav-link"]}>
                <div className={Styles["nav-icon"]}>
                  <DiscountOutlinedIcon />
                </div>
                <span ref={perminssionRef} className={Styles["nav-title"]}>
                  Quản lý khuyến mãi
                </span>
              </Link>
            )}

            {props.path === "/userpermission" ? (
              <Link
                href={"/admin/userpermission"}
                className={`${Styles["nav-link"]} ${Styles["active"]}`}
              >
                <div className={Styles["nav-icon"]}>
                  <HttpsOutlinedIcon />
                </div>
                <span ref={perminssionRef} className={Styles["nav-title"]}>
                  User Permission
                </span>
              </Link>
            ) : (
              <Link
                href={"/admin/userpermission"}
                className={Styles["nav-link"]}
              >
                <div className={Styles["nav-icon"]}>
                  <HttpsOutlinedIcon />
                </div>
                <span ref={perminssionRef} className={Styles["nav-title"]}>
                  User Permission
                </span>
              </Link>
            )}
          </div>
        </div>
        <div
          className={Styles["log-out-wrapper"]}
          onClick={handlingLogout}
          style={{ cursor: "pointer" }}
        >
          <div href={"/admin/logout"} className={Styles["log-out-link"]}>
            <div className={Styles["nav-icon"]}>
              <LogoutOutlinedIcon />
            </div>
            <span ref={logOutRef} className="transt-all-ease">
              Đăng xuất
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
