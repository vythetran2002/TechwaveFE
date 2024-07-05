import React, { useEffect, useRef, useState } from "react";
import PaymentItem from "../PaymentItem/PaymentItem";
import Styles from "./styles.module.css";
import { Modal } from "antd";
import RadioGroup from "@mui/material/RadioGroup";
import { ShopOutlined } from "@ant-design/icons";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Button } from "antd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Spin } from "antd";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { LoadingOutlined } from "@ant-design/icons";
import { useFetchShippingFee } from "@/api/GHN/CountShippingFee";
import { calculateTotalValue } from "@/assets/utils/calculateTotalValue";
import useFetchInitialShopVoucher from "@/api/user/payment/useFetchInitialShopVoucher";
import { formatCurrencyVoucher } from "@/assets/utils/FormatCurrencyVoucher";
import useFetchVoucherByShopId from "@/api/user/payment/useFetchVoucherByShopId";
import VoucherCard from "@/components/ui/voucher-card/VoucherCard";
import Radio from "@mui/material/Radio";
import toast from "react-hot-toast";
import { getVoucherByVoucherId } from "@/api/user/payment/getVoucherByVoucherId";
import { isFutureDate } from "@/assets/utils/payment/IsFutureDate";

function PaymentShop(props) {
  const {
    index,
    updateTotalArray,
    updateShipFeeArray,
    updateDiscountArray,
    updateShopCards,
    updateShopId,
    items,
    handleOpen,
    countShipFee,
    userDistrictId,
    userWardId,
    shopDistrictId,
    shopWardId,
    shopName,
  } = props;

  const [isVoucherProcessed, setIsVoucherProcessed] = useState(false);
  const [shopVoucher, setShopVoucher] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [chosenVoucherId, setChosenVoucherId] = useState(null);

  // API HOOKS
  const shippingFee = useFetchShippingFee(
    shopDistrictId,
    shopWardId,
    userDistrictId,
    userWardId
  );
  const vendorVouchers = useFetchVoucherByShopId(items[0].store.account_id);
  const initialVoucher = useFetchInitialShopVoucher(
    items[0].store.account_id,
    calculateTotalValue(items)
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (chosenVoucherId) {
      const price = calculateTotalValue(items);
      const voucher = await getVoucherByVoucherId(chosenVoucherId, price);
      await setShopVoucher(voucher);
      // await handleUpdateTotalArray();
      handleCancel();
      toast.success("added");
    } else {
      handleCancel();
    }

    // await setShopVoucher(voucher);
    // console.log("success", voucher);
    // setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeRadio = (e) => {
    setChosenVoucherId(e.target.value);
  };

  // const handleUpdateTotalArray = async () => {
  //   if (shopVoucher?.result) {
  //     await updateTotalArray(
  //       index,
  //       calculateTotalValue(items) +
  //         shippingFee.data?.data.total -
  //         shopVoucher.result
  //     );
  //   } else {
  //     await updateTotalArray(
  //       index,
  //       calculateTotalValue(items) + shippingFee.data?.data.total
  //     );
  //   }
  // };

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

  // console.log(shippingFee.data);Di

  useEffect(() => {
    if (initialVoucher.data && !isVoucherProcessed) {
      setShopVoucher(initialVoucher.data);
      setIsVoucherProcessed(true);
      setChosenVoucherId(initialVoucher.discount_id);
    }
    // Co Voucher
    if (shopVoucher?.result) {
      updateTotalArray(
        index,
        calculateTotalValue(items) +
          shippingFee.data?.data.total -
          shopVoucher.result
      );
      updateShipFeeArray(index, shippingFee.data?.data.total);
      updateDiscountArray(index, shopVoucher.result);
      updateShopCards(index, {
        shopId: items[0].store.account_id,
        cart: items,
        totalBill:
          calculateTotalValue(items) +
          shippingFee.data?.data.total -
          shopVoucher.result,
        voucher_id: shopVoucher.discount_id,
      });
    }
    // Khong co voucher
    else {
      updateTotalArray(
        index,
        calculateTotalValue(items) + shippingFee.data?.data.total
      );
      updateShipFeeArray(index, shippingFee.data?.data.total);
      updateDiscountArray(index, 0);
      updateShopCards(index, {
        shopId: items[0].store.account_id,
        cart: items,
        totalBill: calculateTotalValue(items) + shippingFee.data?.data.total,
        voucher_id: null,
      });
    }
  }, [shopVoucher, initialVoucher]);

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
            {shopVoucher ? (
              <>
                <div className={Styles["discountLabel"]}>
                  {"- " + formatCurrencyVoucher(shopVoucher.result)}
                </div>
              </>
            ) : (
              <></>
            )}
            <Button
              size="large"
              type="primary"
              onClick={() => {
                showModal();
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
            {shopVoucher?.result ? (
              <span>
                {FormatPrice(
                  calculateTotalValue(items) +
                    shippingFee.data?.data.total -
                    shopVoucher.result
                )}
              </span>
            ) : (
              <span>
                {FormatPrice(
                  calculateTotalValue(items) + shippingFee.data?.data.total
                )}
              </span>
            )}
          </div>
        </div>
        <Modal
          title={shopName + " Vouchers"}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <RadioGroup onChange={handleChangeRadio} value={chosenVoucherId}>
            <div className={Styles["voucher-admin-container"]}>
              <div className={Styles["voucher-admin-wrapper"]}>
                {vendorVouchers.data?.data ? (
                  vendorVouchers.data.data.map((voucher, index) => {
                    if (isFutureDate(voucher.expires)) {
                      return (
                        <VoucherCard role="vendor" data={voucher} key={index}>
                          <Radio value={voucher.discount_id} name="a"></Radio>
                        </VoucherCard>
                      );
                    }
                  })
                ) : (
                  <React.Fragment>Loading...</React.Fragment>
                )}

                {/* <VoucherCard role="vendor">
                    <Radio value={2} name="b"></Radio>
                  </VoucherCard>
                  <VoucherCard role="vendor">
                    <Radio value={3} name="c"></Radio>
                  </VoucherCard> */}
              </div>
            </div>
          </RadioGroup>
        </Modal>
      </div>
    );
}

export default PaymentShop;
