import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";

import images from "@/assets/images";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import { calculateRemainingDays } from "@/assets/utils/calculateDayRemain";
import dayjs from "dayjs";
import { formatCurrencyVoucher } from "@/assets/utils/FormatCurrencyVoucher";

function voucherCard({ role, children, data }) {
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (role === "vendor") {
    return (
      <div className={Styles["card-container"]}>
        <div className={Styles["card-wrapper"]}>
          <div className={Styles["img-container"]}>
            <div className={Styles["img-wrapper"]}>
              <Image
                src={
                  "https://i.pinimg.com/736x/fb/dc/f4/fbdcf4b9742a55e3434de52b6cba87fb.jpg"
                }
                width={50}
                height={50}
                alt=""
                className={Styles.img}
              ></Image>
              <span className={Styles.title}>
                <div mode="single" forceSingleModeWidth={false}>
                  SHOP AZ
                </div>
              </span>
            </div>
          </div>
          <div className={Styles["content-container"]}>
            <span className={Styles["discount-title"]}>{data.name}</span>
            <span className={Styles["minPrice-title"]}>
              Đơn Tối Thiểu {formatCurrencyVoucher(data.minPrice)}
            </span>
            <div className={Styles["exp-container"]}>
              <span className={Styles["icon-clock"]}>
                <QueryBuilderOutlinedIcon style={{ fontSize: "20px" }} />
              </span>
              <span>
                {calculateRemainingDays(now, data.expires) ===
                "Voucher đã hết hạn" ? (
                  <div
                    mode="single"
                    forceSingleModeWidth={false}
                    style={{ color: "red" }}
                  >
                    {calculateRemainingDays(now, data.expires)}
                  </div>
                ) : (
                  <div mode="single" forceSingleModeWidth={false}>
                    {calculateRemainingDays(now, data.expires)}
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className={Styles["radio-container"]}>{children}</div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className={Styles["card-container"]}>
        <div className={Styles["card-wrapper"]}>
          <div className={Styles["img-container"]}>
            <div className={Styles["img-wrapper"]}>
              <Image
                src={images.techwave}
                width={50}
                height={50}
                alt=""
                className={Styles.img}
              ></Image>
              <span className={Styles.title}>
                <div mode="single" forceSingleModeWidth={false}>
                  Techwave
                </div>
              </span>
            </div>
          </div>
          <div className={Styles["content-container"]}>
            <span className={Styles["discount-title"]}>
              Giảm {data.discount}% - Giảm tối đa {FormatPrice(data.mdPrice)}
            </span>
            <span className={Styles["minPrice-title"]}>
              Đơn Tối Thiểu {FormatPrice(data.minPrice)}
            </span>
            <div className={Styles["exp-container"]}>
              <span className={Styles["icon-clock"]}>
                <QueryBuilderOutlinedIcon style={{ fontSize: "20px" }} />
              </span>
              <span>
                {calculateRemainingDays(now, data.expires) ===
                "Voucher đã hết hạn" ? (
                  <div style={{ color: "red" }}>
                    {calculateRemainingDays(now, data.expires)}
                  </div>
                ) : (
                  <div>{calculateRemainingDays(now, data.expires)}</div>
                )}
                {/* <Textfit mode="single" forceSingleModeWidth={false}>
                  {calculateRemainingDays(now, data.expires)}
                </Textfit> */}
              </span>
            </div>
          </div>
        </div>
        <div className={Styles["radio-container"]}>{children}</div>
      </div>
    );
  }
}

export default voucherCard;
