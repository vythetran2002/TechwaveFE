import React, { useState } from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Layout from "@/components/layout/Layout";
import Styles from "./style.module.css";
import { useRef } from "react";
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
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import useFetchUserFavProduct from "@/api/user/useFetchFavProduct";
import { DeleteFavouriteItem } from "@/api/user/deleteFavouriteProduct";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Delete } from "@mui/icons-material";
import { Empty } from "antd";

function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const user = useFetchUserProfile();
  const products = useFetchUserFavProduct();

  const handlingDeleteFavouriteProduct = async (id) => {
    // try {
    console.log("----");
    const message = DeleteFavouriteItem(id, cookies["token"]);
    console.log(message);
    // } catch (error) {}
  };

  const handlingAddFavouriteProduct = async (id) => {
    try {
      console.log("----");
      const message = await addFavouriteProduct(id, cookies["token"]);
      console.log(message);
      toast.success("Add item succesfully");
    } catch (error) {
      console.log("ERRROR");
      toast.error("Error");
    }
  };

  //states
  const [topAllCheckBox, setTopAllCheckBox] = useState(false);

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

  const handlingChangeTopAllCheckBox = () => {
    if (topAllCheckBox) {
      setTopAllCheckBox(false);
    } else {
      setTopAllCheckBox(true);
    }
  };

  return (
    <>
      <Head>
        <title>Danh sách yêu thích</title>
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
                    className={`${Styles["nav-item-container"]} ${Styles["active"]}`}
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
                  Danh sách yêu thích của tôi
                </span>
                <span>Quản lý danh sách yêu thích</span>
              </div>
              <div className={Styles["product-nav-item-container"]}>
                <div className={Styles["product-nav-container"]}>
                  <div className={Styles["checkbox-name-wrapper"]}>
                    <Checkbox
                      className="flex03 center"
                      checked={topAllCheckBox}
                      onChange={handlingChangeTopAllCheckBox}
                    />
                    <span className="flex1 center">Sản phẩm</span>
                  </div>
                  <div className={Styles["remain-detail-wrapper"]}>
                    <span className="flex1 center">Đơn giá</span>
                    <span className="flex1 center">Số lượng</span>
                    <span className="flex1 center">Số tiền</span>
                    <span className="flex1 center">Thao tác</span>
                  </div>
                </div>
                <div className={Styles["overflow-y"]}>
                  {products.data ? (
                    products.data.data ? (
                      products.data.map((product, index) => {
                        if (product.product) {
                          return (
                            <React.Fragment key={"productItem" + index}>
                              <FavouriteItemCard
                                onClickDelete={handlingDeleteFavouriteProduct}
                                checked={topAllCheckBox}
                                product={product}
                              />
                            </React.Fragment>
                          );
                        }
                      })
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          padding: "20px",
                        }}
                      >
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    )
                  ) : (
                    <>Loading</>
                  )}
                </div>
                {/* <FavouriteCardPopUp
                  checked={topAllCheckBox}
                  handlingChange={handlingChangeTopAllCheckBox}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Index;
