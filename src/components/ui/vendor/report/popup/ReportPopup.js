import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const handleStatus = (status) => {
  if (status == 2) {
    return <span style={{ color: "#dc2626" }}>Chưa duyệt</span>;
  }
  if (status == 1) {
    return <span style={{ color: "#65a30d" }}>Đã duyệt</span>;
  }
};

function ReportPopup(props) {
  const { report } = props;
  console.log(report);
  if (report) {
    return (
      <>
        <div className={roboto.className}>
          <div className={Styles["report-container"]}>
            {report.account_report.avatar != null ? (
              <>
                <Image
                  style={{ borderRadius: "50%" }}
                  src={report.account_report.avatar}
                  width={100}
                  height={100}
                  alt=""
                />
              </>
            ) : (
              <>
                <Image
                  src={images.nonAvatar}
                  width={100}
                  height={100}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              </>
            )}
            <div className={Styles["user-info-container"]}>
              <span>Tên: {report.account_report.username}</span>
              {report.createAt ? (
                <span>{report.createAt}</span>
              ) : (
                <span>Ngày tạo:</span>
              )}
              {handleStatus(report.status)}
            </div>
          </div>
          <div className={Styles["content-container"]}>{report.content}</div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default ReportPopup;
