import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ReportItem from "./ReportItem";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import useFetchReport from "@/api/vendor/useFetchReports";
import { Empty } from "antd";

function ReportList(props) {
  const { limit, page, updateMax } = props;
  const reports = useFetchReport(page, limit);
  console.log(reports);

  useEffect(() => {
    if (reports.data) {
      console.log("---");
      updateMax(reports.data.total);
    }
  }, [reports.data]);

  if (reports.isLoading) {
    return <>Loading</>;
  }
  if (reports.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>ID</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Nội dung</span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Tài khoản khách hàng</span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Avatar</span>
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Thời gian</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Trạng thái</span>
            </div>
          </div>

          {reports.data.results.length != 0 ? (
            reports.data.results.map((report, index) => {
              return (
                <React.Fragment key={"report" + index}>
                  <ReportItem
                    report={report}
                    updateReport={props.updateReport}
                    handleOpen={props.handleOpen}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "20px 0 20px 0",
              }}
            >
              <Empty />
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
