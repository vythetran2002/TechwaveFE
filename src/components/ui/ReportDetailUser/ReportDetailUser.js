import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import useFetchReportById from "@/api/admin/useFetchReportById";
import dayjs from "dayjs";
import { Empty } from "antd";
import useFetchReportDetailUser from "@/api/user/useFetchDetailReportUser";

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

function ReportDetailUser(props) {
  const { id } = props;
  const report = useFetchReportDetailUser(id);
  console.log(report);
  if (report.isLoading) {
    return <>Loading</>;
  }
  if (report.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={roboto.className}>
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
                Username báo cáo : {report.data.account_report.username}
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
            {report.data.content}
          </div>
          <div className={Styles["content-container"]}>
            {report.data.picture ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Image
                  src={report.data.picture}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </>
    );
}

export default ReportDetailUser;
