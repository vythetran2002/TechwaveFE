import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ReportItem from "./ReportItem";
import { useEffect } from "react";
import useFetchReport from "@/api/vendor/useFetchReports";
import { Empty } from "antd";
import { Textfit } from "react-textfit";

function ReportList(props) {
  const { limit, page, updateMax } = props;
  const reports = useFetchReport(page, limit);

  useEffect(() => {
    if (reports.data) {
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
              <span className={Styles["head-title"]}>
                <Textfit mode="single">ID</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Nội dung</Textfit>
              </span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Tài khoản khách hàng</Textfit>
              </span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Avatar</Textfit>
              </span>
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Thời gian</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Trạng thái</Textfit>
              </span>
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
