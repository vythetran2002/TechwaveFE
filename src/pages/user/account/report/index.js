import React, { useState } from "react";
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
import FavouriteItemCard from "@/components/ui/FavouriteItemCard/FavouriteItemCard";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Checkbox } from "antd";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import FavouriteCardPopUp from "@/components/ui/FavouriteItemCard/FavouriteCardPopUp.js/FavouriteCardPopUp";
import useFetchAllReport from "@/api/user/useFetchAllReport";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportDetailUser from "@/components/ui/ReportDetailUser/ReportDetailUser";
import MmsIcon from "@mui/icons-material/Mms";

function Index() {
  const reports = useFetchAllReport();
  const user = useFetchUserProfile();
  const [rpId, setRpId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  console.log(reports);

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

  const updateId = (value) => {
    setRpId(value);
  };

  return (
    <>
      <Head>
        <title>Báo cáo của tôi</title>
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
                    href={""}
                    className={`${Styles["nav-item-container"]} ${Styles["active"]}`}
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
                  <Link
                    href={"/user/account/review"}
                    className={Styles["nav-item-container"]}
                  >
                    <MmsIcon />
                    <span>Đánh giá</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={Styles["profile-right-edit-form-wrapper"]}>
              <div className={Styles["profile-title-container"]}>
                <span style={{ fontWeight: "400", fontSize: "20px" }}>
                  Báo cáo của tôi
                </span>
                <span>Quản lý danh sách báo cáo</span>
              </div>
              <div className={Styles["product-purchase-item-container"]}>
                <div>
                  {/* 0 : processing
                    1 : proccessed */}
                  {reports.data ? (
                    reports.data ? (
                      reports.data.map((reportItem, index) => {
                        return (
                          <React.Fragment key={"reportItem" + index}>
                            <ReportItemCard
                              updateId={updateId}
                              id={reportItem.report_id}
                              handleOpenDialog={handleOpenDialog}
                              status={reportItem.status}
                              date={reportItem.createAt}
                              avatar={reportItem.account_report.avatar}
                              name={reportItem.account_report.username}
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
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <ReportDetailUser id={rpId} />
            </DialogContent>
          </Dialog>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
