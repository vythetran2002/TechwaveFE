import React from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Layout from "@/components/layout/Layout";
import Styles from "../favourites/style.module.css";
import { useRef } from "react";
import ReportItemCard from "@/components/ui/ReportItemCard/ReportItemCard";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import images from "@/assets/images";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import Image from "next/image";
import FollowShopCard from "@/components/ui/FollowShopCard/FollowShopCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Checkbox } from "antd";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import FavouriteCardPopUp from "@/components/ui/FavouriteItemCard/FavouriteCardPopUp.js/FavouriteCardPopUp";
import useFetchUserFollowVendor from "@/api/user/useFetchFollowVendor";
import { RemoveFollowVendor } from "@/api/user/removeFollowVendor";
import { useCookies } from "react-cookie";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
const Empty = dynamic(() => import("antd/lib/empty"), { ssr: false });

function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const vendors = useFetchUserFollowVendor();
  console.log(vendors);
  const user = useFetchUserProfile();

  //Refs
  const passwdRef = useRef();
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const itemRef = useRef();

  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    orderedItem.current.classList.toggle("appear");
    itemRef.current.classList.toggle("show");
    orderingItem.current.classList.toggle("appear");
  };

  const handlingUnfollow = async (id) => {
    try {
      const message = RemoveFollowVendor(id, cookies["token"]);
      console.log(message);
      // toast.success("Unfollowed");
      window.location.reload();
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Theo dõi của tôi</title>
      </Head>
      <UserLayout>
        <Toaster />
        <div className={Styles["profile-edit-card-container"]}>
          <div className={Styles["profile-edit-card-wrapper"]}>
            <div className={Styles["profile-edit-form-wrapper"]}>
              <div className={Styles["profile-left-edit-form-wrapper"]}>
                <div className={Styles["profile-avatar-container"]}>
                  {user && user.data ? (
                    user.data.avatar ? (
                      <>
                        <div className={Styles["profile-avatar-wrapper"]}>
                          <Image
                            width={100}
                            height={100}
                            src={user.data.avatar}
                            className={Styles["avatar"]}
                            alt=""
                          />
                        </div>
                        <div className={Styles["name-phone-container"]}>
                          <span>{user.data.fullname}</span>
                          <span>{user.data.phone}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={Styles["profile-avatar-wrapper"]}>
                          <Image
                            width={100}
                            height={100}
                            src={images.nonAvatar}
                            className={Styles["avatar"]}
                            alt=""
                          />
                        </div>
                        <div className={Styles["name-phone-container"]}>
                          <span>{user.data.fullname}</span>
                          <span>{user.data.phone}</span>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className={Styles["profile-avatar-wrapper"]}>
                        <Image
                          width={100}
                          height={100}
                          src={images.nonAvatar}
                          className={Styles["avatar"]}
                          alt=""
                        />
                      </div>
                      <div className={Styles["name-phone-container"]}>
                        <span>Loading</span>
                        <span>Loading</span>
                      </div>
                    </>
                  )}
                </div>
                <div className={Styles["nav-list-container"]}>
                  <Link
                    href={"/user/account/profile"}
                    className={`${Styles["nav-item-container"]}`}
                  >
                    <AccountCircleIcon />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link
                    href={"/user/account/favourites"}
                    className={`${Styles["nav-item-container"]}`}
                  >
                    <FavoriteBorderIcon />
                    <span>Danh sách yêu thích</span>
                  </Link>
                  <div
                    // href={"/user/account/purchase/1"}
                    className="nav-order-item-container "
                    onClick={handlingClickQLDH}
                    ref={itemRef}
                  >
                    <div className="al-center">
                      <InventoryIcon />
                      <span>Quản lý đơn hàng</span>
                      <KeyboardArrowDownIcon
                        className="ml-120 "
                        ref={iconRef}
                      />
                    </div>
                    <Link
                      href={"/user/account/order"}
                      className="drop-down-item"
                      ref={orderingItem}
                    >
                      <LocalShippingIcon />
                      <span>Đơn hàng của tôi</span>
                    </Link>
                    <Link
                      href={"/user/account/received"}
                      className="drop-down-item"
                      ref={orderedItem}
                    >
                      <DoneIcon />
                      <span>Đơn hàng đã nhận</span>
                    </Link>
                  </div>
                  <Link
                    href={"/user/account/report"}
                    className={`${Styles["nav-item-container"]}`}
                  >
                    <OutlinedFlagRoundedIcon />
                    <span>Báo cáo</span>
                  </Link>
                  <Link
                    href={"/user/account/follow"}
                    className={`${Styles["nav-item-container"]} ${Styles["active"]}`}
                  >
                    <BookmarkOutlinedIcon />
                    <span>Theo dõi</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={Styles["profile-right-edit-form-wrapper"]}>
              <div className={Styles["profile-title-container"]}>
                <span style={{ fontWeight: "400", fontSize: "20px" }}>
                  Theo dõi của tôi
                </span>
                <span>Quản lý danh sách theo dõi</span>
              </div>
              <div className={Styles["follow-shop-item-container"]}>
                {vendors.data ? (
                  vendors.data.length != 0 ? (
                    vendors.data.map((vendor, index) => {
                      return (
                        <React.Fragment key={"vendor" + index}>
                          <FollowShopCard
                            vendorId={vendor.store.account_id}
                            avatar={vendor.store.avatar}
                            name={vendor.store.username}
                            onClickUnFollow={handlingUnfollow}
                          />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        padding: "40px",
                      }}
                    >
                      <Empty />
                    </div>
                  )
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
