import React, { useState, useEffect, useRef } from "react";
import Styles from "./styles.module.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Image from "next/image";
import images from "@/assets/images";
import { LoadingOutlined } from "@ant-design/icons";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Button, Modal, Input, Form, Select, Spin, Divider } from "antd";
import Link from "next/link";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { SendPaymentAmount } from "@/api/user/sendPaymentAmount";
import { useRouter } from "next/router";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import Empty from "antd/lib/empty";
import { MakeShipPayment } from "@/api/user/MakeShipPayment";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import VoucherCard from "@/components/ui/voucher-card/VoucherCard";
import PaymentShop from "@/components/ui/PaymentShop/PaymentShop";
import { regexPhoneNumber } from "@/assets/utils/regex";
import { GHN_API } from "@/api/GHN/GHN";
import { calculateTotalValue } from "@/assets/utils/calculateTotalValue";
import useFetchInitialFreeShip from "@/api/user/payment/useFetchInitialFreeShip";
import { calculateDiscountFreeShip } from "@/assets/utils/calculateDiscountFreeShip";
import useFetchVouchersUser from "@/api/user/useFetchVouchersUser";
import { AddToTotalArray } from "@/assets/utils/payment/AddToTotalArray";
import { calculateArraySum } from "@/assets/utils/payment/calculateArraySum";
import { isFutureDate } from "@/assets/utils/payment/IsFutureDate";
import { getVoucherByVoucherId } from "@/api/user/payment/getVoucherByVoucherId";
import { formatCurrencyVoucher } from "@/assets/utils/FormatCurrencyVoucher";
import { UpdateArrayAtPosition } from "@/assets/utils/payment/UpdateArrayAtPosition";
import PaymentItem from "@/components/ui/PaymentItem/PaymentItem";
import { updateCartQuantities } from "@/assets/utils/payment/handleCheckout/handleContinueCheckout";
import { filterZeroQuantityCarts } from "@/assets/utils/payment/handleCheckout/handleContinueCheckout";
import { updateContinueShop } from "@/assets/utils/payment/handleCheckout/handleContinueCheckout";
import { removeProductFromCart } from "@/assets/utils/payment/handleCheckout/removeProductFromCart";
import { DeleteCartItem } from "@/api/user/deleteCartItem";
import { UpdateCartItem } from "@/api/user/updateCartItem";
import { CalculateTotalValue } from "@/assets/utils/payment/CalculateTotalValue";

function extractCartIds(cartItems) {
  if (cartItems) {
    return cartItems.map((item) => ({ cart: item.cart_id }));
  }
}

function checkNullProperties(obj) {
  for (let key in obj) {
    if (obj[key] === null) {
      return false;
    }
  }
  return true;
}

function refactorProducts(products) {
  if (products) {
    let result = {};
    products.forEach((product) => {
      let shopId = product.product.createBy;
      if (!result[shopId]) {
        result[shopId] = [];
      }
      result[shopId].push(product);
    });
    return Object.values(result);
  }
}

const { TextArea } = Input;

const LocationProvider = new GHN_API();

const totalArray = [];
const shipArray = [];
const discountArray = [];

function Index() {
  const user = useFetchUserProfile();
  const router = useRouter();
  const token = Cookies.get("token");

  //states
  const [isVoucherProcessed, setIsVoucherProcessed] = useState(false);
  const [isUserDataProcessed, setIsUserDataProcessed] = useState(false);
  const [isObjectDataProcessed, setIsObjectDataProcessed] = useState(false);
  const [amount, setAmount] = useState();
  const [adminVoucherValue, setAdminVoucherValue] = useState(1);
  const querry = router.query;
  const [objectsArray, setObjectsArray] = useState(null);
  const [shipFee, setShipFee] = useState(null);
  // const [shipType, setShipType] = useState("");
  const [bill, setBill] = useState({
    fullname: null,
    phone: null,
    address: null,
    totalBill: null,
    express: null,
    carts: null,
  });
  const [shopId, setShopId] = useState(null);
  const [option, setOption] = useState("ship");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVendorOpen, setIsModalVendorOpen] = useState(false);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [isDisabledDistricts, setIsDisabledDistricts] = useState(true);
  const [isDisabledWards, setIsDisabledWards] = useState(true);
  const [total, setTotal] = useState(null);
  const [shopCards, setShopCards] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [chosenVoucherId, setChosenVoucherId] = useState(null);
  const [techwaveVoucher, setTechwaveVoucher] = useState(null);
  const [zeroQuantityProducts, setZeroQuantityProducts] = useState([]);
  const [failedProduct, setFailedProduct] = useState();
  const [successProduct, setSuccessProduct] = useState();
  const [isDisabledCheckoutBtn, setDisabledCheckoutBtn] = useState(false);

  // PopUp Modals
  const [openPopup, setOpenPopup] = useState(false);
  const showModalPopup = () => {
    setOpenPopup(true);
  };
  const handleOkPopup = () => {
    setOpenPopup(false);
  };
  const handleCancelPopup = () => {
    setOpenPopup(false);
  };

  const selectRef = useRef(null);

  const handleButtonClick = () => {
    const selectedValue = selectRef.current?.state.value;
    // console.log("Selected value:", selectedValue);
  };

  //API Hooks
  const provinces = LocationProvider.getProvinces();
  const districts = LocationProvider.getDistricts(provinceId);
  const wards = LocationProvider.getWards(districtId);
  const techwaveVouchers = useFetchVouchersUser();
  const voucherFreeShip = useFetchInitialFreeShip(
    calculateTotalValue(objectsArray)
  );

  const messageRef = useRef();

  const handleChangeRadio = (e) => {
    setChosenVoucherId(e.target.value);
  };

  const handleChangeSelectProvince = (value) => {
    setProvinceId(value.key);
    setDistrictId("");
    setWardId("");
  };

  const handleChangeSelectDistrict = (value) => {
    setDistrictId(value.key);
    setWardId("");
  };

  const handleChangeSelectWard = (value) => {
    setWardId(value.key);
  };

  const updateShopCards = (position, value) => {
    let temp = UpdateArrayAtPosition(shopCards, position, value);
    setShopCards(temp);
    // console.log("shopCards", shopCards);
  };

  const updateTotalArray = (position, value) => {
    let temp = AddToTotalArray(totalArray, position, value);
    setTotal(calculateArraySum(temp));
  };

  const updateShipFeeArray = (position, value) => {
    let temp = AddToTotalArray(shipArray, position, value);
    setShipFee(calculateArraySum(temp));
  };

  const updateDiscountArray = (position, value) => {
    let temp = AddToTotalArray(discountArray, position, value);
    setDiscount(calculateArraySum(temp));
  };

  const handleClickSend = () => {
    let temp = {
      ...bill,
      express: option,
      totalBill:
        parseInt(calculateTotalValue(objectsArray)) + parseInt(shipFee),
      carts: extractCartIds(objectsArray),
    };
    // console.log(temp);
    if (checkNullProperties(temp) && option) {
      messageRef.current.style.display = "none";
      if (option == "ship") {
        // console.log (temp);
        // console.log("ship thwongf");
        try {
          const message = MakeShipPayment(temp, token);
          //console.log(message);
          // toast.success("Thanh toán thành công");
          router.push("/user/account/order");
        } catch (error) {
          console.log(error);
        }
      }
      if (option == "vnpay") {
        let amount = temp.totalBill;
        let temp2 = {
          ...temp,
          amount: amount,
          bankCode: null,
          language: "vn",
          returnUrl:
            process.env.NEXT_PUBLIC_API_URL + "/user/account/transaction",
          carts: extractCartIds(objectsArray),
        };
        //  console.log(temp2);
        const message = SendPaymentAmount(temp2, token);
        // console.log(message);
      }
      // const message = SendPaymentAmount(
      //   {
      //     amount:
      //       parseInt(calculateTotalValue(objectsArray)) + parseInt(shipFee),
      //     bankCode: null,
      //     language: "vn",

      //   },
      //   cookie["token"]
      // );
      // console.log(message);
    } else {
      messageRef.current.style.display = "block";
    }
  };

  const onChangeOption = (e) => {
    setOption(e.target.value);
  };

  const onChangeName = (e) => {
    let temp = { ...bill, fullname: e.target.value };
    setBill(temp);
  };

  const onChangePhone = (e) => {
    let temp = { ...bill, phone: e.target.value };
    setBill(temp);
  };

  const onChangeAddress = (e) => {
    let temp = { ...bill, address: e.target.value };
    setBill(temp);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (chosenVoucherId) {
      const voucher = await getVoucherByVoucherId(chosenVoucherId, total);
      await setTechwaveVoucher(voucher);
      handleCancel();
      toast.success("Đã thêm Voucher");
    } else {
      handleCancel();
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalVendor = () => {
    setIsModalVendorOpen(true);
  };

  // Ve trang chu
  const handleGoToHomePage = async (listItem) => {
    if (listItem.length > 0) {
      listItem.map(async (item, index) => {
        console.log(item.cart_id);
        const message = await DeleteCartItem(item.cart_id, token);
        console.log(message);
      });
      toast.success("Đã xoá sản phẩm khỏi giỏ hàng");
      router.push("/");
    } else {
      router.push("/");
      toast.success("Đã trở lại trang chủ");
    }
  };

  // Xoa san pham
  // const handleDeleteProduct = async (productId, token) => {
  //   try {
  //     // const res = await DeleteCartItem(productId, token);
  //     // const data = decodeURIComponent(router.query.data);
  //     console.log(objectsArray);
  //     console.log(failedProduct);
  //     let newData = removeProductFromCart(objectsArray, failedProduct.cart);
  //     const stringifiedData = JSON.stringify(newData);
  //     const encodedData = encodeURIComponent(stringifiedData);
  //     console.log(encodedData);
  //     // router.push(`/user/account/payment?data=${encodedData}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleUpdateCarts = async (listCarts) => {
    listCarts.map(async (item) => {
      const message = await UpdateCartItem(item.cart_id, item.quantity, token);
    });
  };

  // Tiep tuc thanh toan
  const handleContinueCheckout = async () => {
    // Kiem tra xem co san pham nao het hang hay khong
    let newFailedProduct = updateCartQuantities(failedProduct.cart);
    // Thuc hien Update Carts
    const processUpdateCarts = await handleUpdateCarts(newFailedProduct);
    // Tao new body
    let newShopCards = updateContinueShop(
      newFailedProduct,
      successProduct.shop
    );
    let newInfo = { ...successProduct };
    newInfo.shop = newShopCards;
    if (option == "ship") {
      try {
        const messagePromise = MakeShipPayment(newInfo, token);

        toast.promise(
          messagePromise,
          {
            loading: "Loading ...",
            success: null,
            error: null,
          },
          {
            success: {
              duration: 1,
            },
            error: {
              duration: 1,
            },
          }
        );

        const message = await messagePromise;

        if (message.success) {
          // console.log("Thanh toán thành công:", message.data);
          toast.success("Thanh toán thành công");
          router.push("/user/account/pendingOrder");
          // Xử lý khi thanh toán thành công
        } else {
          toast.error("Thanh toán thất bại");
          // console.log("Thanh toán thất bại:", message.data || message.error);
          showModalPopup();
          setFailedProduct(message.data);
          // Kiem tra xem co san pham nao het hang hay khong
          let newFailedProduct = updateCartQuantities(message.data.cart);
          let zeroQuantityCarts = filterZeroQuantityCarts(newFailedProduct);
          if (zeroQuantityCarts.length > 0) {
            setDisabledCheckoutBtn(true);
            setZeroQuantityProducts(zeroQuantityCarts);
          } else {
            setDisabledCheckoutBtn(false);
          }
          // console.log(zeroQuantityCarts);
          // Xử lý khi thanh toán thất bại
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onFinish = async (values) => {
    let info = {
      ...values,
      email: user.data.email,
      totalBill: total, // TONG CONG
      shipFee: techwaveVoucher?.result
        ? calculateDiscountFreeShip(shipFee, techwaveVoucher?.result)
        : shipFee, // PHI VAN CHUYEN
      totalVoucherDiscount: discount, // TONG VOUCHER GIAM GIA
      incompletedTotal: calculateTotalValue(objectsArray), // TAM TINH
      payment: option,
      shop: shopCards,
      voucher_id: techwaveVoucher?.discount_id,
    };
    info.province = info.province.value;
    info.district = info.district.value;
    info.ward = info.ward.value;
    console.log("FINALL", info);
    setSuccessProduct(info);

    if (option == "ship") {
      try {
        const messagePromise = MakeShipPayment(info, token);

        toast.promise(
          messagePromise,
          {
            loading: "Loading ...",
            success: null,
            error: null,
          },
          {
            success: {
              duration: 1,
            },
            error: {
              duration: 1,
            },
          }
        );

        const result = await messagePromise;

        if (result.success) {
          toast.success("Thanh toán thành công");
          router.push("/user/account/pendingOrder");
        } else {
          toast.error("Thanh toán thất bại");
          showModalPopup();
          setFailedProduct(result.data);

          let newFailedProduct = updateCartQuantities(result.data.cart);
          let zeroQuantityCarts = filterZeroQuantityCarts(newFailedProduct);
          if (zeroQuantityCarts.length > 0) {
            setDisabledCheckoutBtn(true);
            setZeroQuantityProducts(zeroQuantityCarts);
          } else {
            setDisabledCheckoutBtn(false);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi");
      }
    }
    if (option == "vnpay") {
      let temp2 = {
        bankCode: null,
        language: "vn",
        // returnUrl:
        //   process.env.NEXT_PUBLIC_API_URL + "/user/account/transaction",
        ...info,
      };
      // const message = SendPaymentAmount(temp2, token);
      // console.log(message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Something is wrong");
  };

  useEffect(() => {
    if (user.data?.address && !isUserDataProcessed) {
      setProvinceId(user.data.address.province_id);
      setDistrictId(user.data.address.district_id);
      setWardId(user.data.address.ward_id);
      setIsUserDataProcessed(true);
    }
    if (voucherFreeShip.data && !isVoucherProcessed) {
      setTechwaveVoucher(voucherFreeShip.data);
      setIsVoucherProcessed(true);
      setChosenVoucherId(voucherFreeShip.discount_id);
    }

    if (provinceId) {
      setIsDisabledDistricts(false);
    } else {
      setIsDisabledDistricts(true);
    }
    if (districtId) {
      setIsDisabledWards(false);
    } else {
      setIsDisabledWards(true);
    }
    if (router.query.data && !isObjectDataProcessed) {
      try {
        const decodedData = decodeURIComponent(router.query.data);
        const parsedData = JSON.parse(decodedData);
        setObjectsArray(parsedData);
        setIsObjectDataProcessed(true);
      } catch (error) {
        console.error("Error parsing data", error);
      }
    }
  }, [
    router.query.data,
    shipFee,
    provinceId,
    districtId,
    user.data,
    total,
    voucherFreeShip,
    techwaveVoucher,
    objectsArray,
  ]);

  if (objectsArray && user.data) {
    return (
      <>
        <Head>
          <title>Thanh toán đơn hàng</title>
        </Head>
        <Layout>
          <Toaster />
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={Styles["payment-container"]}
            initialValues={{
              fullname: user.data.fullname,
              phone: user.data.phone,
              province: {
                value: user.data.address.province,
              },
              district: {
                key: user.data.address.district_id,
                value: user.data.address.district,
              },
              ward: {
                key: user.data.address.ward_id,
                value: user.data.address.ward,
              },
              address: user.data.address.address,
            }}
          >
            <div className={Styles["user-input-container"]}>
              <span style={{ fontSize: "20px", fontWeight: "400" }}>
                Thông tin mua hàng
              </span>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập họ và tên",
                    },
                  ]}
                >
                  <Input
                    placeholder="Họ và tên"
                    onChange={onChangeName}
                    prefix={<UserOutlined />}
                    size="large"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số điện thoại",
                    },
                    {
                      pattern: regexPhoneNumber,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input
                    placeholder="Số điện thoại"
                    onChange={onChangePhone}
                    prefix={<PhoneOutlined />}
                    size="large"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tỉnh thành",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Tỉnh thành"}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    size="middle"
                    onChange={handleChangeSelectProvince}
                  >
                    {provinces.data ? (
                      provinces.data?.data.map((province) => {
                        return (
                          <Select.Option
                            key={province.ProvinceID}
                            value={province.ProvinceName}
                          >
                            {province.ProvinceName}
                          </Select.Option>
                        );
                      })
                    ) : (
                      <>
                        <Empty />
                      </>
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập quận, huyện",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Quận huyện"}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectDistrict}
                    disabled={isDisabledDistricts}
                  >
                    {districts.data ? (
                      districts.data.data.map((district) => {
                        return (
                          <Select.Option
                            value={district.DistrictName}
                            key={district.DistrictID}
                          >
                            {district.DistrictName}
                          </Select.Option>
                        );
                      })
                    ) : (
                      <Select.Option>
                        <Empty />
                      </Select.Option>
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập xã, phường",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Xã, Phường"}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectWard}
                    disabled={isDisabledWards}
                  >
                    {wards.data ? (
                      wards.data.data?.map((ward) => {
                        return (
                          <Select.Option
                            value={ward.WardName}
                            key={ward.WardCode}
                          >
                            {ward.WardName}
                          </Select.Option>
                        );
                      })
                    ) : (
                      <Select.Option>
                        <Empty />
                      </Select.Option>
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập địa chỉ",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Địa chỉ"
                    autoSize={{
                      minRows: 2,
                      maxRows: 6,
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={Styles["ship-payment-container"]}>
              <div className={Styles["invoice-header-container"]}>
                Đơn hàng ({objectsArray.length} sản phẩm)
              </div>
              {refactorProducts(objectsArray).map((shop, index) => {
                return (
                  <React.Fragment key={index}>
                    <PaymentShop
                      index={index}
                      updateTotalArray={updateTotalArray}
                      updateShipFeeArray={updateShipFeeArray}
                      updateDiscountArray={updateDiscountArray}
                      updateShopCards={updateShopCards}
                      updateShopId={setShopId}
                      countShipFee={LocationProvider.countShippingFee}
                      userDistrictId={districtId}
                      shopName={shop[0].store.username}
                      shopDistrictId={shop[0].store.district_id}
                      shopWardId={shop[0].store.ward_id}
                      userWardId={wardId}
                      items={shop}
                      handleOpen={showModalVendor}
                    />
                  </React.Fragment>
                );
              })}
              {/* <div className={Styles["ship-container"]}>
                <span style={{ fontSize: "20px", fontWeight: "400" }}>
                  Vận chuyển
                </span>
                <div className={Styles["ship-wrapper"]}>
                  <RadioGroup onChange={onChangeRadio} defaultValue={shipFee}>
                    <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio
                          value={40000}
                          name="Giao hàng thông thường"
                        ></Radio>
                        <span>Giao hàng thông thường</span>
                      </div>
                      <span>40.000đ</span>
                    </div>
                    <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio value={100000} name="Giao hàng nhanh" />
                        <span>Giao hàng nhanh</span>
                      </div>
                      <span>100.000đ</span>
                    </div>
                  </RadioGroup>
                </div>
              </div> */}
            </div>
            <div className={Styles["invoice-container"]}>
              <div className={Styles["invoice-header-container"]}>
                Thanh toán
              </div>
              <div className={Styles["item-price-container"]}>
                <div className={Styles["item-container"]}>
                  {/* {objectsArray.length != 0 ? (
                    objectsArray.map((item, index) => {
                      return (
                        <React.Fragment key={("index", index)}>
                          <PaymentItem item={item} />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <>EMPTY</>
                  )} */}
                  <div className={Styles["ship-container"]}>
                    <div className={Styles["ship-wrapper"]}>
                      <RadioGroup
                        defaultValue={option}
                        onChange={onChangeOption}
                      >
                        <div className={Styles["ship-item-wrapper"]}>
                          <div className={Styles["checkbox-name-wrapper"]}>
                            <Radio value={"vnpay"} />
                            <span>Thanh toán qua VNPAY</span>
                          </div>
                          <div className={Styles["payment-img-wrapper"]}>
                            <Image
                              src={images.vnpay}
                              alt=""
                              className={Styles["vnpay"]}
                            />
                          </div>
                        </div>
                        {/* <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio value={"nganluong"} />
                        <span>Thanh toán qua ngân lượng</span>
                      </div>
                      <div className={Styles["payment-img-wrapper"]}>
                        <Image
                          src={images.nganluong}
                          alt=""
                          className={Styles["nganluong"]}
                        />
                      </div>
                    </div> */}
                        {/* <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio value={"moca"} />
                        <span>Thanh toán qua Moca</span>
                      </div>
                      <div className={Styles["payment-img-wrapper"]}>
                        <Image
                          src={images.moca}
                          alt=""
                          className={Styles["moca"]}
                        />
                      </div>
                    </div> */}
                        {/* <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio value={"zaloPay"} />
                        <span>Thanh toán qua Zalo Pay</span>
                      </div>
                      <div className={Styles["payment-img-wrapper"]}>
                        <Image
                          src={images.zaloPay}
                          alt=""
                          className={Styles["zaloPay"]}
                        />
                      </div>
                    </div> */}
                        <div className={Styles["ship-item-wrapper"]}>
                          <div className={Styles["checkbox-name-wrapper"]}>
                            <Radio value={"ship"} />
                            <span>Nhận hàng trực tiếp</span>
                          </div>
                          <div className={Styles["payment-img-wrapper"]}>
                            <Image
                              src={images.ship}
                              alt=""
                              className={Styles["zaloPay"]}
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* <PaymentShop items={objectsArray} /> */}
                </div>
                <div
                  className={Styles["voucher-input-container"]}
                  style={{ alignItems: "center" }}
                >
                  {/* <Input
                    size="large"
                    placeholder="Nhập voucher tại đây"
                    prefix={<LocalActivityOutlinedIcon />}
                  /> */}
                  <div className={Styles["techwave-voucher-label-container"]}>
                    <LocalActivityOutlinedIcon />
                    <span>Techwave Voucher: </span>
                  </div>
                  <div className={Styles["discount-label-btn-container"]}>
                    {techwaveVoucher ? (
                      <>
                        <div className={Styles["discountLabel"]}>
                          {"- " + formatCurrencyVoucher(techwaveVoucher.result)}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <Button size="large" type="primary" onClick={showModal}>
                      Áp dụng
                    </Button>
                  </div>
                </div>
                <div
                  className={Styles["price-container"]}
                  style={{ gap: "20px" }}
                >
                  <div className={Styles["price-wrapper"]}>
                    <span>Tạm tính</span>
                    <span>
                      {FormatPrice(calculateTotalValue(objectsArray))}
                    </span>
                  </div>
                  <div className={Styles["price-wrapper"]}>
                    <span>Phí vận chuyển</span>
                    {techwaveVoucher?.result ? (
                      <div className={Styles["total-ship-fee-wrapper"]}>
                        <span style={{ textDecoration: "line-through" }}>
                          {FormatPrice(shipFee)}
                        </span>
                        <span>
                          {FormatPrice(
                            calculateDiscountFreeShip(
                              shipFee,
                              techwaveVoucher?.result
                            )
                          )}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span>{FormatPrice(shipFee)}</span>
                      </div>
                    )}
                  </div>
                  <div className={Styles["price-wrapper"]}>
                    <span>Tổng voucher giảm giá:</span>
                    <span>- {FormatPrice(discount)}</span>
                  </div>
                </div>
                <div className={Styles["price-container"]}>
                  <div className={Styles["price-total-wrapper"]}>
                    <span>Tổng cộng</span>
                    <span id={Styles["total"]}>
                      {/* {FormatPrice(calculateArraySum(arrayTotal))} */}
                      {/* {FormatPrice(
                        CalculateTotalValue(
                          total,
                          shipFee,
                          techwaveVoucher?.result
                        )
                      )} */}
                      {FormatPrice(total)}
                    </span>
                  </div>
                </div>
                <div
                  className={Styles["submit-input-container"]}
                  style={{ flexDirection: "column" }}
                >
                  <span
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "red",
                      display: "none",
                    }}
                    ref={messageRef}
                  >
                    Vui lòng nhập đầy đủ thông tin
                  </span>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link href={"/"} className={Styles["link"]}>
                      <ArrowBackIosNewOutlinedIcon />
                      <span>Quay trở lại mua sắm</span>
                    </Link>

                    <Button size="large" type="primary" htmlType="submit">
                      ĐẶT HÀNG
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <Modal
            title="Techwave vouchers"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <RadioGroup
              defaultValue={null}
              value={chosenVoucherId}
              onChange={handleChangeRadio}
            >
              <div className={Styles["voucher-admin-container"]}>
                <div className={Styles["voucher-admin-wrapper"]}>
                  {techwaveVouchers.data ? (
                    techwaveVouchers.data.data.map((voucher, index) => {
                      if (isFutureDate(voucher.expires)) {
                        return (
                          <VoucherCard role="admin" data={voucher} key={index}>
                            <Radio value={voucher.discount_id} name="b"></Radio>
                          </VoucherCard>
                        );
                      }
                    })
                  ) : (
                    <>Loading ...</>
                  )}
                  {/* <VoucherCard role="admin">
                    <Radio value={1} name="a"></Radio>
                  </VoucherCard>
                  <VoucherCard role="admin">
                    <Radio value={2} name="b"></Radio>
                  </VoucherCard>
                  <VoucherCard role="admin">
                    <Radio value={3} name="c"></Radio>
                  </VoucherCard> */}
                </div>
              </div>
            </RadioGroup>
          </Modal>
          <Modal
            open={openPopup}
            title="Oops"
            onOk={handleOkPopup}
            width={750}
            onCancel={handleCancelPopup}
            centered
            maskClosable={false}
            footer={(_, { OkBtn, CancelBtn }) => (
              <div className={Styles["popup-footer"]}>
                <Button
                  type="primary"
                  onClick={() => {
                    handleContinueCheckout();
                  }}
                  disabled={isDisabledCheckoutBtn}
                >
                  Tiếp tục thanh toán
                </Button>
                <Button
                  onClick={() => {
                    handleGoToHomePage(zeroQuantityProducts);
                  }}
                >
                  Về trang chủ
                </Button>
                {/* <Button type="primary">
                  Chỉnh sửa số lượng sản phẩm phù hợp
                </Button> */}
              </div>
            )}
          >
            {failedProduct ? (
              <div className={Styles["failed-product-container"]}>
                {failedProduct?.cart.map((item, index) => {
                  return (
                    <React.Fragment key={"failedProduct" + index}>
                      <PaymentItem item={item} isFailedItem={true} />
                      <div className={Styles["failed-product-title-container"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-3"
                          style={{
                            color: "red",
                            width: "20px",
                            height: "20px",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                          />
                        </svg>

                        <span>Xin lỗi, hiện tại chỉ còn</span>
                        <span style={{ color: "red", fontWeight: "600" }}>
                          {item.product.quantity}
                        </span>
                        <span>Sản phẩm trong cửa hàng</span>
                        <span style={{ fontWeight: "600" }}>
                          {item.store.username}
                        </span>
                      </div>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <>
                <Empty />
              </>
            )}
          </Modal>
        </Layout>
      </>
    );
  } else {
    return <>Loading</>;
  }
}

export default Index;
