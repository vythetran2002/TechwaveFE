import React from "react";
import useFetchTestPayment from "@/api/user/testPayment";
import { useRouter } from "next/router";
import Link from "next/link";
import Styles from "./styles.module.css";
import { Button, Result } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Index() {
  const router = useRouter();
  const { query } = router;
  console.log(query);

  const payment = useFetchTestPayment(query);
  console.log(payment);

  const handleClickOrderPage = () => {
    router.push("/user/account/order");
  };

  const handleClickHomePage = () => {
    router.push("/");
  };

  if (payment.isLoading) {
    return (
      <div className={Styles["transaction-container"]}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 50,
              }}
              spin
            />
          }
        />
      </div>
    );
  }
  if (payment.isError) {
    return <>Error</>;
  }
  if (payment.data) {
    if (payment.data.code == "00") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="success"
            title="Đã đặt hàng thành công!"
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "07") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="success"
            title="Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "09") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "10") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần"
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "11") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "12") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "13") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "24") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="	Giao dịch không thành công do: Khách hàng hủy giao dịch"
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "51") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="	Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "65") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="	Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "75") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Ngân hàng thanh toán đang bảo trì."
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "79") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch"
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    if (payment.data.code == "99") {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Đặt hàng không thành công!"
            subTitle=""
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleClickOrderPage}
              >
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy" onClick={handleClickHomePage}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }
  }
}

export default Index;
