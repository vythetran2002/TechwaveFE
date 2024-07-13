import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Image as AntdImage } from "antd";
import images from "@/assets/images";
import useFetchReportById from "@/api/admin/useFetchReportById";
import dayjs from "dayjs";
import { Empty } from "antd";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const handleStatus = (status) => {
  if (status == 0) {
    return <span style={{ color: "#dc2626" }}>Chưa duyệt</span>;
  }
  if (status == 1) {
    return <span style={{ color: "#65a30d" }}>Đã duyệt</span>;
  }
};

function ReportDetailDialog(props) {
  const { id } = props;
  const report = useFetchReportById(id);
  console.log(report);
  // console.log(report);
  if (report.isLoading) {
    return <>Loading</>;
  }
  if (report.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div>
          <div className={Styles["report-container"]}>
            {report.data.account_report.avatar != null ? (
              <>
                <Image
                  style={{ borderRadius: "50%" }}
                  src={report.data.account_report.avatar}
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
              <span>
                Username bị báo cáo : {report.data.account_report.username}
              </span>
              {report.data.createAt ? (
                <span>
                  Ngày tạo: {dayjs(report.data.createAt).format("DD/MM/YYYY")}
                </span>
              ) : (
                <span>Ngày tạo:</span>
              )}
              {handleStatus(report.data.status)}
            </div>
          </div>
          <div className={Styles["content-container"]}>
            <span style={{ fontWeight: "600" }}>NỘI DUNG</span>
            {report.data.content}
          </div>
          <div
            className={Styles["content-container"]}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {report.data.picture ? (
              <AntdImage
                src={report.data.picture}
                alt=""
                width={200}
                height={200}
                style={{ borderRadius: "5px" }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </>
    );
}

export default ReportDetailDialog;
