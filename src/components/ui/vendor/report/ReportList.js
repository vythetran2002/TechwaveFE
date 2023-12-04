import React from "react";
import { useEffect } from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Pagination } from "@mui/material";
import ReportItem from "./ReportItem";
import useFetchAdminReport from "@/api/admin/useFetchAdminReport";
import index from "@/pages/admin/home";
import { Empty } from "antd";

function ReportList(props) {
  const { limit, page, token, updateMax, status } = props;
  const reports = useFetchAdminReport(status, page, limit, token);
  console.log(reports);
  useEffect(() => {
    if (reports.data) {
      console.log("---");
      updateMax(reports.data.total);
    }
  }, [reports.data]);
  if (reports.isLoading) return <>Loading</>;
  if (reports.isError) return <>Error</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>Tài khoản báo cáo</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Tài khoản bị báo cáo</span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Nội dung </span>
            </div>

            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày đánh giá </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Hành động</span>
            </div>
          </div>
          {reports.data.results.length != 0 ? (
            reports.data.results.map((report, index) => {
              return (
                <React.Fragment key={"report" + index}>
                  <ReportItem
                    status={props.status}
                    updateId={props.updateId}
                    report={report}
                    handleOpenDialog={props.handleOpenDialog}
                    token={props.token}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Empty
                image={
                  "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                }
              />
            </div>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={2} size="large" />
        </div> */}
      </>
    );
}

export default ReportList;
