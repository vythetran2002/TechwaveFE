import React, { useState, useEffect, useRef } from "react";
import Styles from "./styles.module.css";
import Layout from "@/components/layout/Layout";
import UserLayout from "@/components/layout/UserLayout";
import Head from "next/head";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import dynamic from "next/dynamic";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Image from "next/image";
import images from "@/assets/images";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PaymentItem from "@/components/ui/PaymentItem/PaymentItem";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Button } from "antd";
import Link from "next/link";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { SendPaymentAmount } from "@/api/user/sendPaymentAmount";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Empty from "antd/lib/empty";
import { MakeShipPayment } from "@/api/user/MakeShipPayment";
import toast, { Toaster } from "react-hot-toast";

const Input = dynamic(() => import("antd/es/input"), { ssr: false });

const calculateTotalValue = (arr) => {
  return arr.reduce((total, obj) => total + obj.price * obj.quantity, 0);
};

function checkNullProperties(obj) {
  for (let key in obj) {
    if (obj[key] === null) {
      return false;
    }
  }
  return true;
}

function Index() {
  const router = useRouter();
  const [cookie] = useCookies();
  const [amount, setAmount] = useState();
  const querry = router.query;
  const [objectsArray, setObjectsArray] = useState(null);
  const [shipFee, setShipFee] = useState(0);
  const [bill, setBill] = useState({
    fullname: null,
    phone: null,
    address: null,
    totalBill: null,
    express: null,
    carts: null,
  });
  const [option, setOption] = useState();

  const messageRef = useRef();

  console.log(objectsArray);

  const handleClickSend = () => {
    let temp = {
      ...bill,
      totalBill:
        parseInt(calculateTotalValue(objectsArray)) + parseInt(shipFee),
      carts: objectsArray,
    };
    // console.log(temp);
    if (checkNullProperties(temp) && option) {
      messageRef.current.style.display = "none";
      if (option == "ship") {
        // console.log(temp);
        // console.log("ship thwongf");
        try {
          const message = MakeShipPayment(temp, cookie["token"]);
          console.log(message);
          toast.success("Thanh toán thành công");
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
          returnUrl: "http://localhost:3001/user/account/transaction",
          carts: objectsArray,
        };
        console.log(temp2);
        const message = SendPaymentAmount(temp2, cookie["token"]);
        console.log(message);
      }
      // const message = SendPaymentAmount(
      //   {
      //     amount:
      //       parseInt(calculateTotalValue(objectsArray)) + parseInt(shipFee),
      //     bankCode: null,
      //     language: "vn",
      //     returnUrl: "http://localhost:3001/user/account/transaction",
      //   },
      //   cookie["token"]
      // );
      // console.log(message);
    } else {
      messageRef.current.style.display = "block";
    }
  };

  const onChangeRadio = (e) => {
    console.log(shipFee);
    setShipFee(e.target.value);
    let temp = { ...bill, express: e.target.name };
    setBill(temp);
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

  useEffect(() => {
    if (router.query.data) {
      try {
        const decodedData = decodeURIComponent(router.query.data);
        const parsedData = JSON.parse(decodedData);
        setObjectsArray(parsedData);
      } catch (error) {
        console.error("Error parsing data", error);
      }
    }
  }, [router.query.data, shipFee]);

  if (objectsArray) {
    return (
      <>
        <Head>
          <title>Thanh toán đơn hàng</title>
        </Head>
        <Layout>
          <Toaster />
          <div className={Styles["payment-container"]}>
            <form className={Styles["user-input-container"]}>
              <span style={{ fontSize: "20px", fontWeight: "400" }}>
                Thông tin mua hàng
              </span>
              <div>
                <Input
                  placeholder="Họ và tên"
                  onChange={onChangeName}
                  prefix={<PersonOutlineOutlinedIcon />}
                />
              </div>
              <div>
                <Input
                  placeholder="Số điện thoại"
                  onChange={onChangePhone}
                  prefix={<LocalPhoneOutlinedIcon />}
                />
              </div>
              <div>
                <Input
                  placeholder="Địa chỉ"
                  onChange={onChangeAddress}
                  prefix={<PlaceOutlinedIcon />}
                />
              </div>
            </form>
            <div className={Styles["ship-payment-container"]}>
              <div className={Styles["ship-container"]}>
                <span style={{ fontSize: "20px", fontWeight: "400" }}>
                  Vận chuyển
                </span>
                <div className={Styles["ship-wrapper"]}>
                  <RadioGroup onChange={onChangeRadio}>
                    <div className={Styles["ship-item-wrapper"]}>
                      <div className={Styles["checkbox-name-wrapper"]}>
                        <Radio value={40000} name="Giao hàng thông thường" />
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
              </div>
              <div className={Styles["ship-container"]}>
                <span>Thanh toán</span>
                <div className={Styles["ship-wrapper"]}>
                  <RadioGroup
                    defaultValue={"Giao hàng tận nơi"}
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
                    <div className={Styles["ship-item-wrapper"]}>
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
                    </div>
                    <div className={Styles["ship-item-wrapper"]}>
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
                    </div>
                    <div className={Styles["ship-item-wrapper"]}>
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
                    </div>
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
            </div>
            <div className={Styles["invoice-container"]}>
              <div className={Styles["invoice-header-container"]}>
                Đơn hàng ({objectsArray.length} sản phẩm)
              </div>
              <div className={Styles["item-price-container"]}>
                <div className={Styles["item-container"]}>
                  {objectsArray.length != 0 ? (
                    objectsArray.map((item, index) => {
                      return (
                        <React.Fragment key={("index", index)}>
                          <PaymentItem item={item} />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <>EMPTY</>
                  )}
                </div>
                <div
                  className={Styles["voucher-input-container"]}
                  style={{ alignItems: "center" }}
                >
                  <Input
                    size="large"
                    placeholder="Nhập voucher tại đây"
                    prefix={<LocalActivityOutlinedIcon />}
                  />
                  <Button size="large" type="primary">
                    Áp dụng
                  </Button>
                </div>
                <div
                  className={Styles["price-container"]}
                  style={{ gap: "20px" }}
                >
                  <div className={Styles["price-wrapper"]}>
                    <span>Tạm tính</span>
                    <span>{calculateTotalValue(objectsArray)}đ</span>
                  </div>
                  <div className={Styles["price-wrapper"]}>
                    <span>Phí vận chuyển</span>
                    <span>{shipFee}đ</span>
                  </div>
                </div>
                <div className={Styles["price-container"]}>
                  <div className={Styles["price-total-wrapper"]}>
                    <span>Tổng cộng</span>
                    <span id={Styles["total"]}>
                      {parseInt(calculateTotalValue(objectsArray)) +
                        parseInt(shipFee)}
                      đ
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

                    <Button
                      size="large"
                      type="primary"
                      onClick={handleClickSend}
                    >
                      ĐẶT HÀNG
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    return <>Loading</>;
  }
}

export default Index;
