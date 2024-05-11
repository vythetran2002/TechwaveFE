import React, { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Form, Select } from "antd";
import { DollarOutlined, PercentageOutlined } from "@ant-design/icons";
import { InputNumber, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CreateVoucherAdmin } from "@/api/admin/createVoucherAdmin";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sxStyle = {
  "& .MuiDialog-container:hover": {
    cursor: "pointer",
  },
  "& .MuiPaper-root": {
    cursor: "default",
  },
  "& .MuiTypography-root": {
    padding: "10px 14px 10px 24px",
  },
  "& .MuiDialogActions-root": {
    padding: "24px",
  },
  "&.css-4g2jqn-MuiModal-root-MuiDialog-root": {
    right: 55,
  },
};

export default function AddVoucherDialogAdmin(props) {
  const onFinish = async (values) => {
    let final = {
      ...values,
      expires: dayjs(values.expires).format("YYYY/MM/DD"),
    };
    console.log(final);
    const message = await CreateVoucherAdmin(final, props.token);
    await props.mutate();
    handlingCloseDialog();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handlingCloseDialog = async () => {
    await props.handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={handlingCloseDialog}
        open={props.isOpen}
        sx={sxStyle}
        className={roboto.className}
      >
        <DialogTitle className={Styles["add-User-dialog-title-container"]}>
          <span className={Styles["add-User-dialog-title-wrapper"]}>
            Thêm Khuyến Mãi
          </span>
          <div
            className={Styles["close-icon-wrapper"]}
            onClick={props.handleClose}
          >
            <CancelOutlinedIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <Toaster />

          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={Styles["add-user-form-container"]}
          >
            {/* <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Tên</span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên khuyến mãi",
                  },
                ]}
              >
                <Input
                  placeholder="Tên khuyến mãi"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div> */}
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Số lượng</span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số lượng khuyến mãi",
                  },
                ]}
              >
                <InputNumber
                  className={Styles["input-wrapper"]}
                  min={1}
                  max={10000}
                  placeholder="số lượng khuyến mãi"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>

            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Đơn từ :</span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="minPrice"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập giá đơn tối thiểu",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={<DollarOutlined />}
                  min={10000}
                  max={1000000000}
                  placeholder="giá đơn tối thiểu"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Giảm giá :</span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập phần trăm giá có thể giảm",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={<PercentageOutlined />}
                  min={1}
                  max={90}
                  placeholder="phần trăm giá giảm"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Giá giảm tối đa:
              </span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="mdPrice"
                rules={[
                  {
                    required: false,
                    message: "Hãy nhập giá giảm tối đa",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const priceValue = getFieldValue("price");
                      if (value && priceValue && value >= priceValue) {
                        return Promise.reject(
                          "Giá giảm tối đa phải nhỏ hơn giá trị đơn hàng tối thiểu"
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <InputNumber
                  addonAfter={<DollarOutlined />}
                  min={10000}
                  max={1000000000}
                  placeholder="giá giảm tối đa"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Ngày hết hạn:
              </span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="expires"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập ngày hết hạn giảm giá",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Ngày hết hạn giảm giá"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div className={Styles["add-user-field-submit-container"]}>
              <span
                className={Styles["add-user-field-cancle-btn"]}
                onClick={props.handleClose}
              >
                Huỷ
              </span>
              <button className={Styles["add-user-field-submit-btn"]}>
                THÊM
              </button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
