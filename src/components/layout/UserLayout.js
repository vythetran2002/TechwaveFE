import React, { useState } from "react";
import UserHeader from "../global/Header/user/Header";
import Styles from "./styles.module.css";
import { useRef } from "react";
import Link from "next/link";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InventoryIcon from "@mui/icons-material/Inventory";
import images from "@/assets/images";
import Image from "next/image";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import FlagIcon from "@mui/icons-material/Flag";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MmsIcon from "@mui/icons-material/Mms";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function UserLayout({
  children,
  user,
  path,
  isActiveOrdersNav,
}) {
  //States
  const [isActive, setIsActive] = useState(isActiveOrdersNav);
  //Refs
  const passwdRef = useRef();
  const iconRef = useRef();
  const pendingItem = useRef();
  const cancledItem = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const orderOption = useRef();
  const itemRef = useRef();
  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    setIsActive(!isActive);
    // orderOption.current.classList.toggle("appear");
    // orderingItem.current.classList.toggle("appear");
    // pendingItem.current.classList.toggle("appear");
    // cancledItem.current.classList.toggle("appear");
  };

  if (user?.data)
    return (
      <>
        <UserHeader />
        <main>
          <div className={Styles["profile-edit-card-container"]}>
            <div className={Styles["profile-edit-card-wrapper"]}>
              <div className={Styles["profile-edit-form-wrapper"]}>
                <div className={Styles["profile-left-edit-form-wrapper"]}>
                  <div className={Styles["profile-avatar-container"]}>
                    {user.data.avatar ? (
                      <div className={Styles["profile-avatar-wrapper"]}>
                        <img
                          width={150}
                          height={150}
                          src={user.data.avatar}
                          className={Styles["avatar"]}
                          alt=""
                        />
                      </div>
                    ) : (
                      <>
                        <div className={Styles["profile-avatar-wrapper"]}>
                          <Image
                            width={150}
                            height={150}
                            src={images.nonAvatar}
                            className={Styles["avatar"]}
                            alt=""
                          />
                        </div>
                      </>
                    )}

                    {user.data ? (
                      <div className={Styles["name-phone-container"]}>
                        <span>{user.data.fullname}</span>
                        <span>{user.data.phone}</span>
                      </div>
                    ) : (
                      <>Loading</>
                    )}
                  </div>
                  <div className={Styles["nav-list-container"]}>
                    <Link
                      href={"/user/account/profile/"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/profile" ? Styles["active"] : ""
                      }`}
                    >
                      <AccountCircleIcon />
                      <span>Thông tin tài khoản</span>
                    </Link>
                    <Link
                      href={"/user/account/favourites"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/favourite" ? Styles["active"] : ""
                      }`}
                    >
                      <FavoriteIcon />
                      <span>Danh sách yêu thích</span>
                    </Link>
                    <div
                      // href={"/user/account/purchase/1"}
                      className="nav-order-item-container "
                      onClick={handlingClickQLDH}
                      ref={itemRef}
                    >
                      <div className={Styles["qldh-title-container"]}>
                        <div className={Styles["qldh-title-wrapper"]}>
                          <InventoryIcon />
                          <span>Quản lý đơn hàng</span>
                        </div>
                        <KeyboardArrowDownIcon className=" " ref={iconRef} />
                      </div>
                      {isActive && (
                        <div
                          ref={orderOption}
                          className={Styles["orders-option-container"]}
                        >
                          <Link
                            href={"/user/account/pendingOrder"}
                            className={`${"drop-down-item "} ${
                              path === "/pendingOrders" ? Styles["active"] : ""
                            }`}
                            ref={pendingItem}
                          >
                            <PendingIcon />
                            <span>Đơn hàng chờ xác nhận</span>
                          </Link>
                          <Link
                            href={"/user/account/order"}
                            className={`${"drop-down-item "} ${
                              path === "/shippingOrders" ? Styles["active"] : ""
                            }`}
                            ref={orderingItem}
                          >
                            <LocalShippingIcon />
                            <span>Đơn hàng vận chuyển</span>
                          </Link>
                          <Link
                            href={"/user/account/received"}
                            className={`${"drop-down-item "} ${
                              path === "/receivedOrders" ? Styles["active"] : ""
                            }`}
                            ref={orderedItem}
                          >
                            <DoneIcon />
                            <span>Đơn hàng đã nhận</span>
                          </Link>
                          <Link
                            href={"/user/account/cancled"}
                            className={`${"drop-down-item "} ${
                              path === "/cancledOrders" ? Styles["active"] : ""
                            }`}
                            ref={cancledItem}
                          >
                            <CancelIcon />
                            <span>Đơn hàng đã huỷ</span>
                          </Link>
                        </div>
                      )}
                    </div>
                    <Link
                      href={"/user/account/report"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/reports" ? Styles["active"] : ""
                      }`}
                    >
                      <FlagIcon />
                      <span>Báo cáo</span>
                    </Link>
                    <Link
                      href={"/user/account/follow"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/follows" ? Styles["active"] : ""
                      }`}
                    >
                      <BookmarkOutlinedIcon />
                      <span>Theo dõi</span>
                    </Link>
                    <Link
                      href={"/user/account/review"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/reviews" ? Styles["active"] : ""
                      }`}
                    >
                      <MmsIcon />
                      <span>Đánh giá</span>
                    </Link>
                    <Link
                      href={"/user/account/vouchers"}
                      className={`${Styles["nav-item-container"]} ${
                        path === "/vouchers" ? Styles["active"] : ""
                      }`}
                    >
                      <ConfirmationNumberIcon />
                      <span>Phiếu giảm giá</span>
                    </Link>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </main>
      </>
    );
}
