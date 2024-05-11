import React, { useState } from "react";
import PaymentItem from "../PaymentItem/PaymentItem";
import Styles from "./styles.module.css";
import { Divider } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Button } from "antd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Spin } from "antd";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { LoadingOutlined } from "@ant-design/icons";
import { GHN_API } from "@/api/GHN/GHN";
import { useFetchShippingFee } from "@/api/GHN/CountShippingFee";
import { calculateTotalValue } from "@/assets/utils/calculateTotalValue";
import useFetchInitialShopVoucher from "@/api/user/payment/useFetchInitialShopVoucher";
import { formatCurrencyVoucher } from "@/assets/utils/FormatCurrencyVoucher";
const LocationProvider = new GHN_API();

function PaymentShop(props) {
  const [shopVoucher, setShopVoucher] = useState(null);

  const {
    updateShopId,
    items,
    handleOpen,
    countShipFee,
    userDistrictId,
    userWardId,
    shopDistrictId,
    shopWardId,
  } = props;

  const shippingFee = useFetchShippingFee(
    shopDistrictId,
    shopWardId,
    userDistrictId,
    userWardId
  );

  const vou = useFetchInitialShopVoucher(
    items[0].store.account_id,
    calculateTotalValue(items)
  );

  console.log(calculateTotalValue(items));

  // const shippingFee = LocationProvider.countShippingFee(
  //   shopDistrictId,
  //   shopWardId,
  //   userDistrictId,
  //   userWardId
  // );

  //console.log("DISTRICT", shopDistrictId);

  // const shippingFee = CountShippingFee(
  //   shopDistrictId,
  //   shopWardId,
  //   userDistrictId,
  //   userWardId
  // );

  // console.log(shippingFee.data);

  if (items)
    return (
      <div className={Styles["shop-card-container"]}>
        <div className={Styles["shop-card-title"]}>
          <ShopOutlined style={{ fontSize: "20px" }} />
          <span className={Styles["shop-name-label"]}>
            {items[0].store.username}
          </span>
        </div>

        {items.length != 0 ? (
          items.map((item, index) => {
            return (
              <React.Fragment key={("index", index)}>
                <PaymentItem item={item} />
              </React.Fragment>
            );
          })
        ) : (
          <>EMPTY</>
        )}
        <div className={Styles["shop-voucher-container"]}>
          <div className={Styles["techwave-voucher-label-container"]}>
            <LocalActivityOutlinedIcon style={{ color: "blue" }} />
            <span>Shop Voucher </span>
          </div>
          <div className={Styles["discountLabel-button-wrapper"]}>
            {vou.data ? (
              <>
                <div className={Styles["discountLabel"]}>
                  {"- " + formatCurrencyVoucher(vou.data.result)}
                </div>
              </>
            ) : (
              <></>
            )}
            <Button
              size="large"
              type="primary"
              onClick={() => {
                handleOpen();
                updateShopId(items[0].store.account_id);
              }}
            >
              Voucher khác
            </Button>
          </div>
        </div>
        <div className={Styles["shop-voucher-container"]}>
          <div className={Styles["techwave-voucher-label-container"]}>
            <LocalShippingIcon style={{ color: "blue" }} />
            <span>Phí Vận chuyển </span>
          </div>
          <div className={Styles["discountLabel-button-wrapper"]}>
            {/* {shippingFee.data ? (
              <span>{FormatPrice(shippingFee.data.data.total)}</span>
            ) : (
              <div style={{ marginRight: "20px" }}>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              </div>
            )} */}
            {shippingFee.isLoading ? (
              <>
                <div style={{ marginRight: "20px" }}>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                        }}
                        spin
                      />
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <span>{FormatPrice(shippingFee.data?.data.total)}</span>
              </>
            )}
          </div>
        </div>
        <div className={Styles["shop-voucher-container"]}>
          <div className={Styles["techwave-voucher-label-container"]}>
            <span>Tổng đơn</span>
          </div>
          <div className={Styles["discountLabel-button-wrapper"]}>
            <span>
              {FormatPrice(
                calculateTotalValue(items) + shippingFee.data?.data.total
              )}
            </span>
          </div>
        </div>
      </div>
    );
}

export default PaymentShop;
