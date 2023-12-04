import React from "react";
import useFetchTestPayment from "@/api/user/testPayment";
import { useRouter } from "next/router";
import Link from "next/link";
import Styles from "./styles.module.css";
import { Button, Result } from "antd";

function Index() {
  const router = useRouter();
  const { query } = router;
  console.log(query);

  const payment = useFetchTestPayment(query);
  console.log(payment);

  if (payment.isLoading) {
    return <>Loading</>;
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
              <Button type="primary" key="console">
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy">Về trang chủ</Button>,
            ]}
          />
        </div>
      );
    } else {
      return (
        <div className={Styles["transaction-container"]}>
          <Result
            status="error"
            title="Đặt hàng không thành công!"
            subTitle=""
            extra={[
              <Button type="primary" key="console">
                Vào đơn hàng của tôi
              </Button>,
              <Button key="buy">Về trang chủ</Button>,
            ]}
          />
        </div>
      );
    }
  }
}

export default Index;
