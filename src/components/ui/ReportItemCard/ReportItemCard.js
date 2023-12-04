import React from "react";
import Styles from "./styles.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { Button } from "antd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import dayjs from "dayjs";

function ReportItemCard(props) {
  const { status } = props;

  return (
    <>
      <div className={Styles["purchase-item-container"]}>
        {status == 0 && (
          <div className={Styles["item-status-container"]}>
            <Button
              type="primary"
              danger
              disabled
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
              }}
            >
              Đang xử được lý
            </Button>
            <div className={Styles["item-status-wrapper"]}>
              <span className={Styles["item-status-wrapper"]}>
                <MoreHorizOutlinedIcon />
              </span>
              <span style={{ marginLeft: "10px" }}>
                Báo cáo đang được phê duyệt
              </span>
            </div>
          </div>
        )}
        {status == 1 && (
          <div className={Styles["item-status-container"]}>
            <div>
              <Button
                type="primary"
                danger
                disabled
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                }}
              >
                Đã được xử lý
              </Button>
            </div>
            <div className={Styles["item-status-wrapper"]}>
              <span className={Styles["item-status-wrapper"]}>
                <CheckCircleOutlineOutlinedIcon />
              </span>
              <span style={{ marginLeft: "10px" }}>
                Báo cáo đã được phê duyệt
              </span>
            </div>
          </div>
        )}

        <div className={Styles["item-info-container"]}>
          <div className={Styles["img-name-container"]}>
            <div className={Styles["img-wrapper"]}>
              {props.avatar ? (
                <>
                  <Image
                    width={70}
                    height={70}
                    src={props.avatar}
                    alt=""
                    priority={true}
                    className={Styles["img"]}
                  />
                </>
              ) : (
                <>
                  props.avatar ? (
                  <Image
                    width={70}
                    height={70}
                    src={images.nonAvatar}
                    alt=""
                    priority={true}
                    className={Styles["img"]}
                  />
                </>
              )}
            </div>
            <div className={Styles["name-wrapper"]}>
              {props.date ? (
                <>
                  <span>{dayjs(props.date).format("DD/MM/YYYY")}</span>
                </>
              ) : (
                <></>
              )}
              <span>{props.name}</span>
            </div>
          </div>
          <div className={Styles["price-container"]}></div>
        </div>
      </div>
    </>
  );
}

export default ReportItemCard;
