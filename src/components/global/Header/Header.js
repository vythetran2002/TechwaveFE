import React, { useEffect, useRef } from "react";
import Styles from "./styles.module.css";
import { useState, useCallback } from "react";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import images from "@/assets/images";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import CartItem from "@/components/ui/CartItem/CartItem";
import Checkbox from "@mui/material/Checkbox";
import { DeleteOutline } from "@mui/icons-material";
import { memo } from "react";
import debounce from "lodash/debounce";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import { DeleteCartItem } from "@/api/user/deleteCartItem";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import queryString from "query-string";
import { LogOutAccount } from "@/api/auth/LogOutAcount";
import { Empty } from "antd";
import useFetchCart from "@/api/user/useFetchCart";
import Cookies from "js-cookie";
import useFetchSearchProduct from "@/api/useFetchSearchProduct";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchItemCard from "@/components/ui/SearchItemCard/SearchItemCard";
import SearchItemContainer from "@/components/ui/SearchItemContainer.js/SearchItemContainer";

const calculateTotalValue = (arr) => {
  if (arr) {
    return arr.reduce((total, obj) => {
      if (obj.product.promotional_price) {
        return total + obj.product.promotional_price * obj.quantity;
      } else {
        return total + obj.product.price * obj.quantity;
      }
    }, 0);
  }
};

function isObjectEmpty(obj) {
  return obj !== null && Object.keys(obj).length === 0;
}

function hasToken(obj) {
  return (
    obj.hasOwnProperty("token") && obj.token !== null && obj.token !== undefined
  );
}

function countElementsWithStatusOne(array) {
  if (!isObjectEmpty(array)) {
    return array.reduce((count, element) => {
      if (element.status === "0") {
        return count + 1;
      }
      return count;
    }, 0);
  }
}

function Header(props) {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isLogin, setIsLogin] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [select, setSelect] = useState([]);
  const user = useFetchUserProfile();
  const [amount, setAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const cart = useFetchCart();
  //const result = useState({ data: null, loading: true, error: false });
  let result = { data: null, loading: true, error: false };

  // console.log(result);
  // const authToken = useAuthToken();
  // console.log(cart);

  //refs
  const searchContainerRef = useRef();

  const logOut = async () => {
    const message = LogOutAccount(token);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Loading...",
      success: (result) => {
        Cookies.remove("token");
        router.push("/auth/login");
        return "Đăng xuất thành công";
      },
      error: "Something's wrong",
    });
  };

  const showDrawer = () => {
    setCartItems(cart.data);
    setOpen(true);
  };

  const resetSelect = () => {
    setSelect([]);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sxStyle = {
    marginTop: "35px",
  };

  const handleSearch = () => {
    if (search) {
      router.push("/search?name=" + search);
    } else {
      toast.error("Vui lòng nhập thông tin");
    }
  };

  const handlingDeleteCartItem = async (id) => {
    try {
      const message = await DeleteCartItem(id, token);
      await toast.success("Xoá đơn hàng thành công");
      await cart.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handlingCheckAll = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const mutateCart = () => {
    cart.mutate();
  };

  const handlingClickDelete = () => {
    let temp = select;
    if (temp) {
      temp.map((item) => {
        console.log(item.cart_id);
        handlingDeleteCartItem(item.cart_id);
      });
    }
    // console.log(temp);
    setSelect([]);
  };

  const onClickPay = () => {
    if (!user.data) {
      toast.error("Cần đăng nhập");
    } else if (select.length == 0) {
      toast.error("Chọn hàng để thanh toán");
    } else {
      const stringifiedData = JSON.stringify(select);
      const encodedData = encodeURIComponent(stringifiedData);
      router.push(`/user/account/payment?data=${encodedData}`);
    }
  };

  const debouncedHandleChange = useCallback(
    debounce(async (value) => {
      console.log("Debounced value:", value);
      setSearch(value);
    }, 300),
    []
  );

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    debouncedHandleChange(value);
  };

  // useEffect(() => {
  //   console.log(cookies);
  // }, [cookies]);

  // useEffect(() => {
  //   // Logic bạn muốn thực hiện khi token thay đổi
  //   if (cookies) {
  //     console.log("Đã đăng nhập với cookie:", cookies["token"]);
  //     // Fetch user data or validate token...
  //   } else {
  //     console.log("Chưa đăng nhập");
  //   }
  // }, [cookies]); // Phụ thuộc vào giá trị state của token// Phụ thuộc vào giá trị state của token

  useEffect(() => {
    if (cart.data) {
      setCartItems(cart.data);
    }
    setAmount(calculateTotalValue(select));
  }, [select, cart.data, select]);

  // if (user.isLoading) {
  //   return <>Loading</>;
  // }
  // if (user.isError) {
  //   return <>Error</>;
  // } else

  return (
    <>
      <section className={Styles["header-container"]}>
        <section className={Styles["info-container"]}>
          <div className={Styles["phone-mail-container"]}>
            <div className={Styles["phone-mail-wrapper"]}>
              <div className={Styles["phone-container"]}>
                <CallOutlinedIcon sx={{ color: "white", marginRight: "1px" }} />
                <span>0816.789.439</span>
              </div>
              <div
                className={Styles["mail-container"]}
                style={{ marginLeft: "20px" }}
              >
                <MailOutlineOutlinedIcon
                  style={{ color: "white", marginRight: "3px" }}
                />
                <span>techwaveute@gmail.com</span>
              </div>
            </div>
            <div className={Styles["phone-mail-wrapper"]}>
              {/* <Badge count={1} size="small"> */}
              {user.data ? (
                <>
                  <div className={Styles["avatar-wrapper"]}>
                    {user.data ? (
                      user.data.avatar ? (
                        <div className={Styles["avatar-container"]}>
                          <img
                            width={50}
                            height={50}
                            src={user.data.avatar}
                            alt=""
                            priority={true}
                            className={Styles["avatar"]}
                          />
                          <div className={Styles["avatar-dropdown-container"]}>
                            <div className={Styles["info"]}>
                              <span className={Styles["info-name"]}>
                                {user.data.fullname}
                              </span>
                              <span className={Styles["info-email"]}>
                                {user.data.email}
                              </span>
                            </div>
                            <div className={Styles["nav-avt-list"]}>
                              <Link
                                href={"/user/account/profile/"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <AccountCircleOutlinedIcon />
                                <span>Tài khoản của tôi</span>
                              </Link>
                              <Link
                                href={"/user/account/profile"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <EditNoteOutlinedIcon />
                                <span>Đổi mật khẩu</span>
                              </Link>
                              <Link
                                href={"/user/account/favourites"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <FavoriteBorderOutlinedIcon />
                                <span>Sản phẩm yêu thích</span>
                              </Link>
                            </div>
                            <div
                              className={Styles["nav-avt-logout"]}
                              onClick={logOut}
                              style={{ cursor: "pointer" }}
                            >
                              <PowerSettingsNewOutlinedIcon />
                              <span>Đăng xuất</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={Styles["avatar-container"]}>
                          <Image
                            src={images.nonAvatar}
                            alt=""
                            priority={true}
                            className={Styles["avatar"]}
                          />
                          <div className={Styles["avatar-dropdown-container"]}>
                            <div className={Styles["info"]}>
                              <span className={Styles["info-name"]}>
                                {user.data.fullname}
                              </span>
                              <span className={Styles["info-email"]}>
                                {user.data.email}
                              </span>
                            </div>
                            <div className={Styles["nav-avt-list"]}>
                              <Link
                                href={"/user/account/profile/"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <AccountCircleOutlinedIcon />
                                <span>Tài khoản của tôi</span>
                              </Link>
                              <Link
                                href={"/user/account/profile"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <EditNoteOutlinedIcon />
                                <span>Đổi mật khẩu</span>
                              </Link>
                              <Link
                                href={"/user/account/favourites"}
                                className={Styles["nav-avatar-item"]}
                              >
                                <FavoriteBorderOutlinedIcon />
                                <span>Sản phẩm yêu thích</span>
                              </Link>
                            </div>
                            <div
                              className={Styles["nav-avt-logout"]}
                              onClick={logOut}
                              style={{ cursor: "pointer" }}
                            >
                              <PowerSettingsNewOutlinedIcon />
                              <span>Đăng xuất</span>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* <div className={Styles["avatar-dropdown-container-2"]}></div> */}
                </>
              ) : (
                <div className={Styles["resgister-login-container"]}>
                  <Link href={"/auth/register"} style={{ cursor: "pointer" }}>
                    Đăng ký
                  </Link>
                  <Link href={"/auth/login"} style={{ cursor: "pointer" }}>
                    Đăng nhập
                  </Link>
                </div>
              )}

              {/* </Badge> */}
            </div>
          </div>
        </section>
        <section className={Styles["search-container"]}>
          <div className={Styles["logo-search-phone-cart-container"]}>
            <div className={Styles["logo-container"]}>
              <Link href="/">
                <Image
                  src={images.techwave}
                  alt="Tech-wave-logo"
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    maxHeight: "100%",
                  }}
                />
              </Link>
            </div>
            <div className={Styles["search-phone-cart-container"]}>
              <div className={Styles["search-form"]}>
                <div className={Styles["input-group"]}>
                  <input
                    type="text"
                    className={Styles["input-search"]}
                    placeholder="Tìm kiếm ..."
                    onChange={handleChangeSearch}
                  ></input>
                  <div
                    className={Styles["button-search"]}
                    onClick={handleSearch}
                  >
                    <SearchOutlinedIcon />
                  </div>
                </div>
                {search !== "" && (
                  <SearchItemContainer
                    searchContainerRef={searchContainerRef}
                    value={search}
                  />
                )}
              </div>
              <button className={Styles["phone-button"]}>
                <CallOutlinedIcon
                  className={Styles["phone-button-wrapper"]}
                  style={{ fontSize: "10px !important" }}
                />
                <span style={{ flex: "1", textAlign: "start" }}>
                  0816.789.439
                </span>
              </button>
              <button className={Styles["cart-button"]} onClick={showDrawer}>
                <div className={Styles["cart-title-container"]}>
                  <span className={Styles["cart-label"]}>Giỏ hàng</span>
                  {/* <span style={{ textAlign: "start", flex: "0.9" }}>
                    của tôi
                  </span> */}
                </div>
                <div className={Styles["cart-icon-container"]}>
                  <ShoppingCartOutlinedIcon />
                  {cart.data && !isObjectEmpty(cart.data) && (
                    <div className={Styles["amount-cart-item-wrapper"]}>
                      <div className={Styles["amount-cart-item"]}>
                        {countElementsWithStatusOne(cart.data)}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
          <Drawer
            title="Giỏ hàng của bạn"
            placement="right"
            onClose={onClose}
            open={open}
            width={"500px"}
            closable={false}
            footer={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className={Styles["delete-button"]}
                  onClick={handlingClickDelete}
                >
                  <DeleteOutline className={Styles["delete-icon"]} />
                </button>
                <button
                  // href={"/user/account/payment"}
                  className={Styles["buynow-button"]}
                  style={{
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={onClickPay}
                >
                  Đặt hàng
                </button>
              </div>
            }
          >
            <div className={Styles["cart-info-container"]}>
              <span>Tổng tiền: {FormatPrice(amount)}</span>
              <div className={Styles["quantity-checkbox-container"]}>
                {cart.data && (
                  <>
                    <span>
                      Số lượng: {countElementsWithStatusOne(cart.data)}
                    </span>
                  </>
                )}

                {/* <div>
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" } }}
                    checked={isChecked}
                    onChange={handlingCheckAll}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div> */}
              </div>
            </div>
            <div className={Styles["cart-item-list-container"]}>
              {cart.data && !isObjectEmpty(cart.data) ? (
                cart.data.map((cartItem, index) => {
                  if (cartItem.status == 0) {
                    return (
                      <React.Fragment key={"cartItem" + index}>
                        <CartItem
                          mutate={mutateCart}
                          resetSelect={resetSelect}
                          token={token}
                          isChecked={isChecked}
                          item={cartItem}
                          onClickDelete={handlingClickDelete}
                          select={select}
                          updateSelect={setSelect}
                        />
                      </React.Fragment>
                    );
                  }
                })
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0 20px 0",
                  }}
                >
                  <Empty />
                </div>
              )}
            </div>
          </Drawer>
        </section>
      </section>
    </>
  );
}

export default memo(Header);
