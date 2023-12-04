import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Styles from "../favourites/style.module.css";
import UserLayout from "@/components/layout/UserLayout";
import { useRef } from "react";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import images from "@/assets/images";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavouriteItemCard from "@/components/ui/FavouriteItemCard/FavouriteItemCard";
import Image from "next/image";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";
import { Checkbox } from "antd";
import FavouriteCardPopUp from "@/components/ui/FavouriteItemCard/FavouriteCardPopUp.js/FavouriteCardPopUp";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchReceivedProducts from "@/api/user/useFetchRecievedProduct";

function Index() {
  const user = useFetchUserProfile();
  const orders = useFetchReceivedProducts();
  console.log(orders);
  //Refs
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();

  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    orderedItem.current.classList.toggle("appear");
    orderingItem.current.classList.toggle("appear");
  };

  return (
    <>
      <Head>
        <title>Đơn hàng đã nhận</title>
      </Head>
      <UserLayout>
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
                    className={Styles["nav-item-container"]}
                  >
                    <FavoriteBorderIcon />
                    <span>Danh sách yêu thích</span>
                  </Link>
                  <div
                    // href={"/user/account/purchase/1"}
                    className="nav-order-item-container show "
                    onClick={handlingClickQLDH}
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
                      className="drop-down-item  appear"
                      ref={orderingItem}
                    >
                      <LocalShippingIcon />
                      <span>Đơn hàng của tôi</span>
                    </Link>
                    <Link
                      href={"/user/account/received"}
                      className="drop-down-item appear active"
                      ref={orderedItem}
                    >
                      <DoneIcon />
                      <span>Đơn hàng đã nhận</span>
                    </Link>
                  </div>
                  <Link
                    href={"/user/account/report"}
                    className={Styles["nav-item-container"]}
                  >
                    <OutlinedFlagRoundedIcon />
                    <span>Báo cáo</span>
                  </Link>
                  <Link
                    href={"/user/account/follow"}
                    className={Styles["nav-item-container"]}
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
                  Danh sách đơn hàng
                </span>
                <span>Quản lý danh sách đơn hàng</span>
              </div>
              <div className={Styles["product-purchase-item-container"]}>
                <div>
                  {orders.data ? (
                    orders.data.length != 0 ? (
                      orders.data.map((oderItem, index) => {
                        return (
                          <React.Fragment key={"oderItem" + index}>
                            <PurchaseItemCard
                              status={oderItem.status}
                              quantity={oderItem.cart_id.quantity}
                              price={oderItem.totalBill}
                              name={oderItem.cart_id.product.name}
                              option={oderItem.cart_id.option.name}
                              img={oderItem.cart_id.option.image}
                            />
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <>Empty</>
                    )
                  ) : (
                    <>Loading</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
