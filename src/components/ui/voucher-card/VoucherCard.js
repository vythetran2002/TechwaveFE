import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { Textfit } from "react-textfit";
import images from "@/assets/images";

function voucherCard({ role, children }) {
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
                className={Styles.img}
              ></Image>
              <span className={Styles.title}>
                <Textfit mode="single" forceSingleModeWidth={false}>
                  SHOP AZ
                </Textfit>
              </span>
            </div>
          </div>
          <div className={Styles["content-container"]}>
            <span className={Styles["discount-title"]}>Giảm 8%</span>
            <span className={Styles["minPrice-title"]}>Đơn Tối Thiểu 3tr</span>
            <div className={Styles["exp-container"]}>
              <span className={Styles["icon-clock"]}>
                <QueryBuilderOutlinedIcon style={{ fontSize: "20px" }} />
              </span>
              <span>
                <Textfit mode="single" forceSingleModeWidth={false}>
                  Đến ngày 2-2-2022
                </Textfit>
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
                className={Styles.img}
              ></Image>
              <span className={Styles.title}>
                <Textfit mode="single" forceSingleModeWidth={false}>
                  Techwave
                </Textfit>
              </span>
            </div>
          </div>
          <div className={Styles["content-container"]}>
            <span className={Styles["discount-title"]}>Giảm 8%</span>
            <span className={Styles["minPrice-title"]}>Đơn Tối Thiểu 3tr</span>
            <div className={Styles["exp-container"]}>
              <span className={Styles["icon-clock"]}>
                <QueryBuilderOutlinedIcon style={{ fontSize: "20px" }} />
              </span>
              <span>
                <Textfit mode="single" forceSingleModeWidth={false}>
                  Đến ngày 2-2-2022
                </Textfit>
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
